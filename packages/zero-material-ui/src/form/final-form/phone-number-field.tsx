import * as React from 'react';
import { TextField } from '@material-ui/core';
import { PhoneMaskField } from '../react-text-mask/phone-mask-field';
import { Field } from 'react-final-form';

interface OwnProps {
  name: string;
  fullWidth?: boolean;
  variant?: any;
  placeholder?: string;
  label?: string;
  initialValue?: any;
  multiline?: boolean;
  disabled?: boolean;
  helperText?: string;
  rows?: number;
  rowsMax?: number;
  required?: boolean;
}

export const PhoneNumberField: React.FC<OwnProps> = ({ initialValue = '', name, ...props }) => {
  const inputProps = {
    inputComponent: PhoneMaskField,
  };
  return (
    <Field
      name={name}
      initialValue={initialValue}
      type="text"
      render={({ input, meta }) => {
        return (
          <TextField
            {...input}
            {...props}
            InputProps={inputProps}
            error={Boolean(meta.touched && meta.error)}
            helperText={
              meta.touched && meta.error ? meta.error : props.helperText ? props.helperText : null
            }
          />
        );
      }}
    />
  );
};
