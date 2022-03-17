import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { reduxForm, Form, Field } from 'redux-form';

import Select from '../../../shared/components/Select/ReduxFormWrapper';
import { FUJI, MUMBAI, noop, RINKEBY } from '../../../utils';
import { renderTextField } from '../../../shared/components/ReduxForm';
import { FormControlLabel } from '@material-ui/core';

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

const TokenDetails = ({ handleSubmit, onDetailsChange }) => (
  <Form onSubmit={handleSubmit(onDetailsChange)} className="amount-token">
    <div className="form-field">
      <Field
        className="input-field"
        name="amount"
        component={renderTextField}
        label="Amount"
      />
    </div>
    <div className="form-field">
      <FormControlLabel
        className="form-field token"
        classes={{
          root: 'token-root',
          label: 'token-label',
        }}
        label="Token"
        labelPlacement="start"
        control={
          <Field
            name="token"
            component={Select}
            options={states}
          />
        }
      />
    </div>
  </Form>
);

TokenDetails.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onDetailsChange: PropTypes.func,
  loading: PropTypes.bool,
};

TokenDetails.defaultProps = {
  onDetailsChange: noop,
  loading: false,
};

export default reduxForm({ form: 'TokenDetails' })(withRouter(TokenDetails));
