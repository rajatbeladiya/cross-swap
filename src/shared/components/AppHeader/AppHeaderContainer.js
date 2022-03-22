import React, { Component } from 'react';
import { connect } from 'react-redux';
import { providers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import AppHeader from './AppHeader';
import * as dashboardActions from '../../../modules/dashboard/redux/actions';
import { showNotification } from '../../../utils/Notifications';

const INFURA_ID = '1bb06d6c96b94a678f902858aa99025b';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
}

let web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

class AppHeaderContainer extends Component {

  state = {
    provider: '',
    web3Provider: '',
    address: '',
    chainId: '',
  };

  componentDidMount() {
    try {
      this.onConnect();
    } catch (e) {
      console.log('e====', e);
    }
  }

  onConnect = async () => {
    try {
      const { setWeb3 } = this.props;
      const provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);
  
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
  
      const network = await web3Provider.getNetwork();
  
      setWeb3({
        provider,
        web3Provider,
        address,
        network: network.chainId
      })
    } catch(e) {
      console.log('e======', e);
      showNotification(e.message, 'error', 5000);
    }
  }

  onDisconnect = async () => {
    const { web3, setWeb3 } = this.props;
    await web3Modal.clearCachedProvider()
    setWeb3({
      provider: '',
      web3Provider: '',
      address: '',
      network: ''
    })
    if (web3.provider?.disconnect && typeof web3.provider.disconnect === 'function') {
      await web3.provider.disconnect();
    }
  }

  render() {
    const { web3 } = this.props;
    return (
      <AppHeader
        onConnect={this.onConnect}
        onDisconnect={this.onDisconnect}
        web3={web3}
      />
    )
  }
}

const mapStateToProps = state => ({
  web3: state.dashboard.web3,
});

const mapDispatchToProps = dispatch => ({
  setWeb3: details => dispatch(dashboardActions.setWeb3(details))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeaderContainer);
