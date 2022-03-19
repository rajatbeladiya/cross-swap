import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import TokenDetails from './TokenDetails';
import Source from './Source';
import { noop } from '../../../utils';

const Landing = ({
  onTransferClick, sourceNetworkOptions, onSourceChange, selectedSource,
  selectedDestination, onDestinationChange, destinationNetworkOptions,
  tokenOptions, onTokenChange, selectedToken,
}) => (
  <div className="landing-container">
    <div className="transfer-wrapper">
      <div className="title">
        <h2>Swap</h2>
      </div>
      <Source
        sourceNetworkOptions={sourceNetworkOptions}
        destinationNetworkOptions={destinationNetworkOptions}
        onSourceChange={onSourceChange}
        onDestinationChange={onDestinationChange}
        selectedSource={selectedSource}
        selectedDestination={selectedDestination}
      />
      <TokenDetails
        tokenOptions={tokenOptions}
        onTokenChange={onTokenChange}
        selectedToken={selectedToken}
      />
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
  sourceNetworkOptions: PropTypes.instanceOf(Array),
  destinationNetworkOptions: PropTypes.instanceOf(Array),
  tokenOptions: PropTypes.instanceOf(Array),
  onSourceChange: PropTypes.func,
  selectedSource: PropTypes.instanceOf(Object),
  selectedDestination: PropTypes.instanceOf(Object),
  onDestinationChange: PropTypes.func,
  onTokenChange: PropTypes.func,
  selectedToken: PropTypes.instanceOf(Object),
}

Landing.defaultProps = {
  onTransferClick: noop,
  sourceNetworkOptions: [],
  destinationNetworkOptions: [],
  tokenOptions: [],
  onSourceChange: noop,
  selectedSource: {},
  selectedDestination: {},
  onDestinationChange: noop,
  onTokenChange: noop,
  selectedToken: {},
}

export default Landing;
