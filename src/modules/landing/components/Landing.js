import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import TokenDetails from './TokenDetails';
import Source from './Source';
import { noop } from '../../../utils';
import GoogleLoader from '../../../shared/components/GoogleLoader';
import BlockUI from 'react-block-ui';

const Landing = ({
  onTransferClick, sourceNetworkOptions, onSourceChange, selectedSource,
  selectedDestination, onDestinationChange, destinationNetworkOptions,
  tokenOptions, onTokenChange, selectedToken, userSelectedTokenBalance,
  onAmountChange, amount, loading,
}) => (
  <div className="landing-container">
    <BlockUI
      tag="div"
      blocking={loading}
      className="swap-block-ui"
      loader={<GoogleLoader height={50} width={50} />}
    >
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
          userSelectedTokenBalance={userSelectedTokenBalance}
          onAmountChange={onAmountChange}
          amount={amount}
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
    </BlockUI>
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
  userSelectedTokenBalance: PropTypes.number,
  onAmountChange: PropTypes.func,
  amount: PropTypes.number,
  loading: PropTypes.bool,
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
  userSelectedTokenBalance: 0,
  onAmountChange: noop,
  amount: 0,
  loading: false,
}

export default Landing;
