import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import SwapIcon from '@material-ui/icons/SwapHorizRounded';

import Select from '../../../shared/components/Select/Select';
import { noop } from '../../../utils';

const Source = ({
  sourceNetworkOptions, onSourceChange, selectedSource,
  selectedDestination, onDestinationChange, destinationNetworkOptions,
}) => (
  <div className="source-destination">
    <div className="source">
      <label>Source</label>
      <Select
        name="source"
        placeholder="Select..."
        valueKey="value"
        options={sourceNetworkOptions}
        value={selectedSource}
        onChange={onSourceChange}
        isSearchable={false}
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
        options={destinationNetworkOptions}
        value={selectedDestination}
        onChange={onDestinationChange}
        isSearchable={false}
      />
    </div>
  </div>
);

Source.propTypes = {
  onSourceChange: PropTypes.func,
  sourceNetworkOptions: PropTypes.instanceOf(Array),
  destinationNetworkOptions: PropTypes.instanceOf(Array),
  selectedSource: PropTypes.instanceOf(Object),
  onDestinationChange: PropTypes.func,
}

Source.defaultProps = {
  onSourceChange: noop,
  sourceNetworkOptions: [],
  destinationNetworkOptions: [],
  selectedSource: [],
  onDestinationChange: noop,
}

export default Source;
