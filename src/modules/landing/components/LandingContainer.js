import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Landing from './Landing';
import * as landingActions from '../redux/actions';
import { TESTNETS, availablePairs, noop, TOKENS, tokensConfig } from '../../../utils';

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

  onTokenChange = (selectedValue) => {
    const { selectedToken, selectedSource, selectedDestination } = this.state;
    const { getPoolInfo } = this.props;
    const data = {
      tokenAddress: tokensConfig[selectedValue.value][selectedSource.chainId],
      fromChainId: selectedSource.chainId,
      toChainId: selectedDestination.chainId
    };
    console.log('data======', data);
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
};

LandingContainer.defaultProps = {
  getPoolInfo: noop,
};

const mapStateToProps = state => ({
  data: state.landing.data,
});

const mapDispatchToProps = dispatch => ({
  getPoolInfo: data => dispatch(landingActions.getPoolInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
