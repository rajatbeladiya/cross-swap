import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ethers } from 'ethers';
import { Hyphen } from '@biconomy/hyphen';

import Landing from './Landing';
import * as landingActions from '../redux/actions';
import { TESTNETS, availablePairs, noop, TOKENS, tokensConfig, ETHAddress, getContract } from '../../../utils';
import ERC20ABI from '../../../config/ERC20ABI.json';
import { showNotification } from '../../../utils/Notifications';

class LandingContainer extends Component {

  state = {
    selectedSource: '',
    selectedDestination: '',
    sourceNetworkOptions: [],
    destinationNetworkOptions: [],
    tokenOptions: [],
    selectedToken: '',
    userSelectedTokenBalance: 0,
    amount: '',
    accounts: [],
    swapLoading: false,
    preTransferStatus: {},
  };

  componentDidMount() {
    const sourceNetworkOptions = this.getOptions(TESTNETS);
    const tokenOptions = this.getOptions(TOKENS);
    this.setState({ sourceNetworkOptions, tokenOptions });
    this.onSourceChange(sourceNetworkOptions[0]);
  }

  onSourceChange = (selectedValue) => {
    const destinationNetworkOptions = this.getOptions(availablePairs[selectedValue.chainId]);
    this.setState({
      selectedSource: selectedValue,
      selectedDestination: '',
      destinationNetworkOptions,
      selectedToken: '',
      amount: '',
    });
  }
  
  onDestinationChange = (selectedValue) => {
    this.setState({ selectedDestination: selectedValue, selectedToken: '', amount: '' });
  } 

  onTokenChange = async (selectedValue) => {
    const { selectedSource, selectedDestination } = this.state;
    const { getPoolInfo, web3: { web3Provider } } = this.props;
    const accounts = await web3Provider.listAccounts();
    try {
      this.setState(prevState => ({
        selectedToken: selectedValue,
        accounts,
        amount: '',
      }), async () => {
        const { selectedToken } = this.state;
        const tokenAddress = tokensConfig[selectedToken.value][selectedSource.chainId];
        if (!tokenAddress) {
          showNotification("Token is not supported on this chain", "error", 5000);
          return;
        }
        const data = {
          tokenAddress,
          fromChainId: selectedSource.chainId,
          toChainId: selectedDestination.chainId
        };
  
        let userSelectedTokenBalance;
        if (tokenAddress === ETHAddress) {
          userSelectedTokenBalance = await web3Provider.getBalance(accounts[0]);
        } else {
          try {
            const tokenContract = await getContract(tokenAddress, ERC20ABI, web3Provider);
            userSelectedTokenBalance = await tokenContract.balanceOf(accounts[0]);
          } catch (e) {
            console.log("e=====", e.message);
          }
        }
        userSelectedTokenBalance = ethers.utils.formatUnits(userSelectedTokenBalance, selectedToken.decimal);
        this.setState({ userSelectedTokenBalance });
        getPoolInfo(data);
      });
    } catch (e) {
      console.log('e======', e);
    }
  }

  getOptions = (options = []) => {
    const stateOptions =  options.map(testnet => (
        {
          ...testnet,
          label: (
            <div className="network-options">
              <img src={testnet.icon} className="network-icon" alt="network-icon" />
              <label className="network-label">{testnet.name}</label>
            </div>
          ),
        }
      ));
    return stateOptions;
  };

  onAmountChange = (event) => {
    const { value } = event.target;
    this.setState({ amount: value });
  }

  onTransferClick = async (event) => {
    const { web3: { provider } } = this.props;
      const { amount, selectedToken, selectedSource, selectedDestination, accounts } = this.state;
      this.setState({ swapLoading: true });
      if (amount > 0 ) {
        try {
          const parseAmount = ethers.utils.parseUnits(amount.toString(), selectedSource.decimal);
  
          let hyphen = new Hyphen(provider, {
            debug: true,
            environment: "test",
          });
          hyphen.init();
          let preTransferStatus = await hyphen.preDepositStatus({
            tokenAddress: tokensConfig[selectedToken.value][selectedSource.chainId],
            amount: parseAmount.toString(),
            fromChainId: selectedSource.chainId,
            toChainId: selectedDestination.chainId,
            userAddress: accounts[0],
          });
          console.log('preTransferStatus=====', preTransferStatus);
          this.setState({ swapLoading: true, preTransferStatus }, () => {
            this.deposit(hyphen, parseAmount);
          });
        } catch (e) {
          console.log('e=====', e);
          this.setState({ swapLoading: false });
          showNotification('somthing went wrong', 'error', 5000);
        }
      }
  }

  deposit = async (hyphen, parseAmount) => {
    const { accounts, selectedToken, selectedSource, preTransferStatus, selectedDestination } = this.state;
    try {
      let depositTx = await hyphen.deposit({
        sender: accounts[0],
        receiver: accounts[0],
        tokenAddress: tokensConfig[selectedToken.value][selectedSource.chainId],
        depositContractAddress: preTransferStatus.depositContract,
        amount: parseAmount,
        fromChainId: selectedSource.chainId,
        toChainId: selectedDestination.chainId,
        useBiconomy: false,
      });
      await depositTx.wait(1);
      this.setState({ swapLoading: false });
      showNotification('transferred successfully', 'success', 5000);
      console.log('depositTransaction======', depositTx);
    } catch (e) {
      this.setState({ swapLoading: false });
      showNotification('somthing went wrong', 'error', 5000);
      console.log('e===', e);
    }
  }

  render() {
    const {
      selectedSource, selectedDestination, sourceNetworkOptions, destinationNetworkOptions,
      tokenOptions, selectedToken, userSelectedTokenBalance, amount, swapLoading,
    } = this.state;
    const { loading } = this.props;
    return (
      <Landing
        sourceNetworkOptions={sourceNetworkOptions}
        destinationNetworkOptions={destinationNetworkOptions}
        selectedDestination={selectedDestination}
        onSourceChange={this.onSourceChange}
        onDestinationChange={this.onDestinationChange}
        selectedSource={selectedSource}
        tokenOptions={tokenOptions}
        onTokenChange={this.onTokenChange}
        selectedToken={selectedToken}
        userSelectedTokenBalance={userSelectedTokenBalance}
        onAmountChange={this.onAmountChange}
        amount={amount}
        onTransferClick={this.onTransferClick}
        loading={loading || swapLoading}
      />
    );
  }
}

LandingContainer.propTypes = {
  getPoolInfo: PropTypes.func,
  web3: PropTypes.instanceOf(Object),
  loading: PropTypes.bool,
};

LandingContainer.defaultProps = {
  getPoolInfo: noop,
  web3: {},
  loading: false,
};

const mapStateToProps = state => ({
  loading: state.landing.swapLoading,
  data: state.landing.data,
  web3: state.dashboard.web3,
});

const mapDispatchToProps = dispatch => ({
  getPoolInfo: data => dispatch(landingActions.getPoolInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
