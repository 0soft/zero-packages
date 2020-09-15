import * as React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { FormHelperText, Box, InputLabel, FormControl } from '@material-ui/core';
import { CheckboxGroup, CheckboxOption } from './checkbox-group';

interface OwnProps {
  name: string;
  label?: string;
  labelColor?: string;
  options: CheckboxOption[];
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const CheckboxGroupField: React.FC<OwnProps> = ({
  name,
  label,
  labelColor = 'green',
  options,
  multiple = true,
}) => {
  return (
    <FieldArray
      name={name}
      render={({ fields, meta }) => (
        <>
          <Box className={`bl-${labelColor} input-label`} py={1} px={1.5}>
            <InputLabel htmlFor={`checkbox-${name}`}>{label}</InputLabel>
          </Box>
          <Box width="100%">
            <FormControl error={Boolean(meta.touched && meta.error)}>
              <CheckboxGroup fields={fields} options={options} multiple={multiple} />
              {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
            </FormControl>
          </Box>
        </>
      )}
    />
  );
};
