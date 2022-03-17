import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SwapIcon from '@material-ui/icons/SwapHorizRounded';

import Select from '../../../shared/components/Select/Select';
import TokenDetails from './TokenDetails';
import { noop, MUMBAI, RINKEBY, FUJI } from '../../../utils';

const states = [
  {
    label: (
      <div>
        <img src={MUMBAI.icon} className="token-icon" alt="token-icon" />
        <label>{MUMBAI.name}</label>
      </div>
    ),
    value: 'MUMBAI'
  },
  {
    label: (
      <div>
        <img src={RINKEBY.icon} className="token-icon" alt="token-icon" />
        <label>{RINKEBY.name}</label>
      </div>
    ),
    value: 'RINKEBY'
  },
  {
    label: (
      <div>
        <img src={FUJI.icon} className="token-icon" alt="token-icon" />
        <label>{FUJI.name}</label>
      </div>
    ),
    value: 'FUJI'
  },
];

const Landing = ({ onTransferClick }) => (
  <div className="landing-container">
    <div className="transfer-wrapper">
      <div className="source-destination">
        <div className="source">
          <label>Source</label>
          <Select
            name="source"
            placeholder="Select..."
            valueKey="value"
            options={states}
            // value={selectedState}
            // onChange={onStateChange}
          />
        </div>
        <div className="swap">
          <IconButton
            // onClick={() => { props.closeDialog(CHANGE_PASSWORD_DIALOG); }}
            className="swap-btn"
          >
            <SwapIcon />
          </IconButton>
        </div>
        <div className="destination">
          <label>Destination</label>
          <Select
            name="destination"
            placeholder="Select..."
            valueKey="value"
            options={states}
            // value={selectedState}
            // onChange={onStateChange}
          />
        </div>
      </div>
      <div className="token-details-wrapper">
        <TokenDetails />
      </div>
      <div className="transfer">
        <Button
          variant="contained"
          onClick={(event) => onTransferClick(event)}
          className="transfer-btn"
        >
          <div>transfer</div>
        </Button>
      </div>
    </div>
  </div>
);

Landing.propTypes = {
  onTransferClick: PropTypes.func,
}

Landing.defaultProps = {
  onTransferClick: noop,
}

export default Landing;
