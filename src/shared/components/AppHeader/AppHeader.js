import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

import { noop, start_and_end } from "../../../utils";

const AppHeader = ({ account, onConnect, web3, onDisconnect }) => {
  return (
    <div className="app-header-container" id="app-header">
      <div className="app-name-wrapper">
        {/* <img src={Icon} className="app-icon" alt="app-icon" /> */}
        <div className="app-name">Cross Swap</div>
      </div>
      <div className="menu-items">
      </div>
      <div className="wallet-connection">
        <div className="wallet-address">{web3 && web3.address && start_and_end(web3.address)}</div>
        <Button
          // basic
          variant='contained'
          onClick={(event) => web3 && web3.address ? onDisconnect(event) : onConnect(event)}
          className="autorize-btn"
        >
          <div>{web3 && web3.address ? 'Disconnect' : 'Connect'}</div>
        </Button>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  account: PropTypes.string,
  admin: PropTypes.string,
  onConnect: PropTypes.func,
  onDisconnect: PropTypes.func,
  web3: PropTypes.instanceOf(Object),
}

AppHeader.defaultProps =  {
  account: '',
  admin: '',
  onConnect: noop,
  onDisconnect: noop,
  web3: {},
}

export default withRouter(AppHeader);
