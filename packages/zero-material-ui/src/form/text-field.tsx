import * as React from 'react';
import { Field } from 'react-final-form';
import { TextField as MUITextField } from '@material-ui/core';
import { InputProps } from '@material-ui/core/Input';

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
  value?: any;
  type?: string;
  required?: boolean;
  InputProps?: InputProps;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const TextField: React.FC<OwnProps> = ({
  name,
  initialValue,
  value,
  type,
  ...fieldProps
}) => {
  return (
    <Field
      name={name}
      initialValue={initialValue}
      type={type}
      render={({ input, meta }) => (
        <MUITextField
          {...input}
          {...fieldProps}
          value={value || input.value}
          error={Boolean(meta.touched && meta.error)}
          helperText={
            meta.touched && meta.error
              ? meta.error
              : fieldProps.helperText
              ? fieldProps.helperText
              : null
          }
        />
      )}
    />
  );
};
