import React from 'react';
import PropTypes from 'prop-types';

import Select from './Select';
import { noop } from '../../../utils';

const ReduxFormWrapper = ({
  input: {
    value, onChange, onBlur, ...restInput
  },
  meta: { touched, error }, name, id, className, placeholder, disabled, multi, options, type,
  valueKey, labelKey, loadOptions, defaultOptions, noOptionsMessage, isSearchable,
  closeMenuOnSelect, isDisabled, menuIsOpen, menuPortalStyles, controlStyles,
  dropdownIndicatorStyles, clearIndicatorStyles, sort, allowCSV, formatCreateLabel, menuPlacement,
  ...rest
}) => (
  <Select
    {...restInput}
    {...rest}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    touched={touched}
    error={error}
    name={name}
    id={id}
    className={className}
    placeholder={placeholder}
    disabled={disabled}
    multi={multi}
    options={options}
    type={type}
    valueKey={valueKey}
    labelKey={labelKey}
    loadOptions={loadOptions}
    defaultOptions={defaultOptions}
    noOptionsMessage={noOptionsMessage}
    isSearchable={isSearchable}
    closeMenuOnSelect={closeMenuOnSelect}
    isDisabled={isDisabled}
    menuIsOpen={menuIsOpen}
    menuPortalStyles={menuPortalStyles}
    controlStyles={controlStyles}
    dropdownIndicatorStyles={dropdownIndicatorStyles}
    clearIndicatorStyles={clearIndicatorStyles}
    sort={sort}
    allowCSV={allowCSV}
    formatCreateLabel={formatCreateLabel || (userInput => `Create "${userInput}"`)}
    menuPlacement={menuPlacement}
  />
);

ReduxFormWrapper.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  meta: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.oneOf(['Async', 'AsyncCreatable', 'Creatable', '']),
  options: PropTypes.instanceOf(Object),
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  multi: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  loadOptions: PropTypes.func,
  defaultOptions: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  isSearchable: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  menuPortalStyles: PropTypes.instanceOf(Object),
  controlStyles: PropTypes.instanceOf(Object),
  dropdownIndicatorStyles: PropTypes.instanceOf(Object),
  clearIndicatorStyles: PropTypes.instanceOf(Object),
  sort: PropTypes.func,
  allowCSV: PropTypes.bool,
  formatCreateLabel: PropTypes.func,
  menuPlacement: PropTypes.string,
};

ReduxFormWrapper.defaultProps = {
  input: {},
  meta: {},
  type: '',
  options: {},
  name: '',
  id: '',
  className: '',
  placeholder: '',
  disabled: false,
  multi: false,
  valueKey: 'value',
  labelKey: 'value',
  loadOptions: noop,
  defaultOptions: false,
  noOptionsMessage: noop,
  isSearchable: true,
  closeMenuOnSelect: undefined,
  isDisabled: false,
  menuIsOpen: undefined,
  menuPortalStyles: {},
  controlStyles: {},
  dropdownIndicatorStyles: {},
  clearIndicatorStyles: {},
  sort: null,
  allowCSV: false,
  formatCreateLabel: undefined, // if user don't pass this prop,then default value will add in label
  menuPlacement: 'bottom',
};

export default ReduxFormWrapper;
