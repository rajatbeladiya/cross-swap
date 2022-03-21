import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ethers } from 'ethers';

import Landing from './Landing';
import * as landingActions from '../redux/actions';
import { TESTNETS, availablePairs, noop, TOKENS, tokensConfig, ETHAddress, getContract } from '../../../utils';
import ERC20ABI from '../../../config/ERC20ABI.json';

class LandingContainer extends Component {

  state = {
    selectedSource: '',
    selectedDestination: '',
    sourceNetworkOptions: [],
    destinationNetworkOptions: [],
    tokenOptions: [],
    selectedToken: '',
  };

  componentDidMount() {
    const sourceNetworkOptions = this.getOptions(TESTNETS);
    const tokenOptions = this.getOptions(TOKENS);
    this.setState({ sourceNetworkOptions, tokenOptions });
    this.onSourceChange(sourceNetworkOptions[0]);
  }

  onSourceChange = (selectedValue) => {
    const destinationNetworkOptions = this.getOptions(availablePairs[selectedValue.chainId]);
    this.setState({ selectedSource: selectedValue, selectedDestination: '', destinationNetworkOptions, selectedToken: ''});
  }
  
  onDestinationChange = (selectedValue) => {
    this.setState({ selectedDestination: selectedValue });
  } 

  onTokenChange = async (selectedValue) => {
    const { selectedSource, selectedDestination } = this.state;
    const { getPoolInfo, web3: { web3Provider } } = this.props;
    const tokenAddress = tokensConfig[selectedValue.value][selectedSource.chainId];
    const data = {
      tokenAddress,
      fromChainId: selectedSource.chainId,
      toChainId: selectedDestination.chainId
    };
    let accounts, userBalance;
    accounts = await web3Provider.listAccounts();
    if (tokenAddress === ETHAddress) {
      userBalance = await web3Provider.getBalance(accounts[0]);
      console.log('userBalance======', ethers.utils.formatEther(userBalance));
    } else {
      const tokenContract = await getContract(tokenAddress, ERC20ABI, web3Provider);
      console.log('tokenContract=======', tokenContract);
      userBalance = await tokenContract.balanceOf(accounts[0]);
      console.log('userBalance======', ethers.utils.formatUnits(userBalance));
    }
    getPoolInfo(data);
    this.setState({ selectedToken: selectedValue });
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

  render() {
    const {
      selectedSource, selectedDestination, sourceNetworkOptions, destinationNetworkOptions,
      tokenOptions, selectedToken,
    } = this.state;
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
      />
    );
  }
}

LandingContainer.propTypes = {
  getPoolInfo: PropTypes.func,
  web3: PropTypes.instanceOf(Object),
};

LandingContainer.defaultProps = {
  getPoolInfo: noop,
  web3: {},
};

const mapStateToProps = state => ({
  data: state.landing.data,
  web3: state.dashboard.web3,
});

const mapDispatchToProps = dispatch => ({
  getPoolInfo: data => dispatch(landingActions.getPoolInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
