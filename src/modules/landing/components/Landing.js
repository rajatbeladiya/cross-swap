import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Select from '../../../shared/components/Select/Select';
import { noop } from '../../../utils';

const states = [];

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
      <div className="amount-token">

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
