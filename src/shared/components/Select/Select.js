import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatable from 'react-select/async-creatable';
import Creatable from 'react-select/creatable';

import { noop } from '../../../utils';

const SelectType = (type, properties, asyncProps) => {
  switch (type) {
    case 'Async':
      return (
        <AsyncSelect
          {...properties}
          {...asyncProps}
          loadOptions={asyncProps.loadOptions}
        />
      );
    case 'AsyncCreatable':
      return (
        <AsyncCreatable
          loadingMessage={() => {}}
          {...properties}
          {...asyncProps}
          loadOptions={asyncProps.loadOptions}
        />
      );
    case 'Creatable':
      return (
        <Creatable
          {...properties}
          {...asyncProps}
        />
      );
    default:
      return (
        <ReactSelect
          {...properties}
          {...asyncProps}
          options={properties.options}
        />
      );
  }
};

const Select = ({
  value, onChange, onBlur, touched, error, type, options, name, id, className, placeholder,
  disabled, multi, valueKey, labelKey, loadOptions, defaultOptions, noOptionsMessage, isSearchable,
  defaultMenuIsOpen, closeMenuOnSelect, isDisabled, menuIsOpen, menuPortalStyles, controlStyles,
  dropdownIndicatorStyles, clearIndicatorStyles, sort, allowCSV, formatCreateLabel, menuPlacement,
  menuStyles, ...rest
}) => {
  const properties = {
    ...rest,
    id,
    name,
    onBlur: () => onBlur(value),
    onChange: (values, actionType) => {
      if (onChange && values) {
        let _values = values;
        // code to create tags automatic when comma-separated values are pasted
        if (allowCSV && actionType && actionType.action === 'create-option') {
          const newValues = _values && _values[_values.length - 1]
            && _values[_values.length - 1].value
            && _values[_values.length - 1].value.split(', ');
          _values.pop();
          newValues.forEach((val) => {
            const _val = val.trim();
            if (_val && _values.findIndex(_value => _value.value === _val) === -1) {
              _values.push({ label: _val, value: _val });
            }
          });
        }
        if (multi && sort) {
          _values = _values.sort(sort);
        }
        onChange(_values);
      } else {
        onChange(null);
      }
      return values;
    },
    disabled,
    placeholder,
    isMulti: multi,
    menuPosition: 'absolute',
    menuPlacement,
    className: `react-select ${className} ${touched && !!error ? 'react-select__error' : ''}`,
    classNamePrefix: `${className} react-select`,
    styles: {
      menuPortal: base => ({
        ...base, ...menuPortalStyles, zIndex: 9999,
      }),
      control: base => ({
        ...base, ...controlStyles,
      }),
      dropdownIndicator: base => ({
        ...base,
        ...dropdownIndicatorStyles,
      }),
      clearIndicator: base => ({
        ...base,
        ...clearIndicatorStyles,
      }),
      menu: base => ({
        ...base,
        ...menuStyles,
      }),
    },
    defaultOptions,
    noOptionsMessage,
    isSearchable,
    defaultMenuIsOpen,
    closeMenuOnSelect,
    isDisabled,
    menuIsOpen,
    formatCreateLabel,
  };

  if (multi) {
    if (value && value.length > 0) {
      if (typeof value[0] === 'string') {
        properties.value = value.map(val => ({ value: val }));
      } else {
        properties.value = value;
      }
    } else {
      properties.value = [];
    }
    properties.valueKey = valueKey;
    properties.labelKey = labelKey;
  } else {
    // properties.value = options.find(option => option.value === value);
    properties.value = value && typeof value === 'string' ? options.find(option => option[valueKey] === value) : value;
  }
  properties.options = options;

  const asyncProperties = {
    loadOptions: inputValue => loadOptions(inputValue, labelKey, valueKey),
  };

  return (
    <div className="select-outer-wrapper">
      <div className="select-wrapper">
        {SelectType(type, properties, asyncProperties)}
      </div>
      {
        touched && !!error
        && <p className="error">{error}</p>
      }
    </div>
  );
};

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.oneOf(['Async', 'AsyncCreatable', 'Creatable', '']),
  options: PropTypes.instanceOf(Array),
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  multi: PropTypes.bool,
  menuPortalStyles: PropTypes.instanceOf(Object),
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  loadOptions: PropTypes.func,
  defaultOptions: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  isSearchable: PropTypes.bool,
  defaultMenuIsOpen: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  controlStyles: PropTypes.instanceOf(Object),
  dropdownIndicatorStyles: PropTypes.instanceOf(Object),
  clearIndicatorStyles: PropTypes.instanceOf(Object),
  sort: PropTypes.func,
  allowCSV: PropTypes.bool,
  formatCreateLabel: PropTypes.func,
  menuPlacement: PropTypes.string,
  menuStyles: PropTypes.instanceOf(Object),
};

Select.defaultProps = {
  value: '',
  onChange: noop,
  onBlur: noop,
  touched: false,
  error: '',
  type: '',
  options: [],
  name: '',
  id: '',
  className: '',
  placeholder: '',
  disabled: false,
  multi: false,
  menuPortalStyles: {},
  valueKey: 'value',
  labelKey: 'value',
  loadOptions: noop,
  defaultOptions: false,
  noOptionsMessage: noop,
  isSearchable: true,
  defaultMenuIsOpen: false,
  closeMenuOnSelect: undefined,
  isDisabled: false,
  menuIsOpen: undefined,
  controlStyles: { minHeight: 40 },
  dropdownIndicatorStyles: {},
  clearIndicatorStyles: {},
  sort: null,
  allowCSV: false,
  formatCreateLabel: noop,
  menuPlacement: 'bottom',
  menuStyles: {},
};

export default Select;
