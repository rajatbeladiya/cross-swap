import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import Select from '../../../shared/components/Select/Select';
import { noop } from '../../../utils';

const TokenDetails = ({
  tokenOptions, onTokenChange, onAmountChange,
  selectedToken, poolInfo, userSelectedTokenBalance,
  amount,
}) => (
  <div className="amount-token">
    <div className="amount form-field">
      <label>Amount</label>
      <TextField
        id="amount"
        name="amount"
        placeholder="Amount"
        value={amount}
        onChange={onAmountChange}
      />
      <div className="footer limits-amount">
        <div className="min-amount">Min: {(poolInfo && poolInfo.minDepositAmount) || 0}</div>
        <div className="max-amount">Max: {(poolInfo && poolInfo.maxDepositAmount) || 0}</div>
      </div>
    </div>
    <div className="token form-field">
      <label>Token</label>
      <Select
        name="token"
        placeholder="Select..."
        valueKey="value"
        options={tokenOptions}
        value={selectedToken}
        onChange={onTokenChange}
        isSearchable={false}
      />
      <div className="footer">
        <div className="balance">Balance: {Number(userSelectedTokenBalance).toFixed(4)}</div>
      </div>
    </div>
  </div>
);

TokenDetails.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onDetailsChange: PropTypes.func,
  loading: PropTypes.bool,
  tokenOptions: PropTypes.instanceOf(Array),
  selectedToken: PropTypes.instanceOf(Object),
  poolInfo: PropTypes.instanceOf(Object),
  userSelectedTokenBalance: PropTypes.number,
  onAmountChange: PropTypes.func,
  amount: PropTypes.number,
};

TokenDetails.defaultProps = {
  onDetailsChange: noop,
  loading: false,
  tokenOptions: [],
  selectedToken: {},
  poolInfo: {},
  userSelectedTokenBalance: 0,
  onAmountChange: noop,
  amount: 0,
};

const mapStateToProps = state => ({
  poolInfo: state.landing.poolInfo,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenDetails);
