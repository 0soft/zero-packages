import * as React from 'react';
import { Field } from 'react-final-form';
import { InputProps } from '@material-ui/core/Input';
import { FormControlLabel, Checkbox, FormControl, FormHelperText } from '@material-ui/core';

interface OwnProps {
  disabled?: boolean;
  initialValue?: any;
  InputProps?: InputProps;
  required?: boolean;
  name: string;
  label?: string;
  helperText?: string;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const CheckboxField: React.FC<OwnProps> = ({ name, label, ...rest }) => {
  return (
    <Field
      name={name}
      type="checkbox"
      render={({ input, meta }) => (
        <FormControl error={Boolean(meta.touched && meta.error)}>
          <FormControlLabel
            label={label}
            control={
              <Checkbox value={name} checked={input.checked} onChange={input.onChange} {...rest} />
            }
          />
          {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
