import * as React from 'react';
import { Checkbox, Box, FormControlLabel } from '@material-ui/core';

export interface CheckboxOption {
  label?: string;
  value: string;
}

interface OwnProps {
  options: CheckboxOption[];
  fields: any;
  multiple?: boolean;
}

export const CheckboxGroup: React.FC<OwnProps> = ({ fields, options, multiple = true }) => {
  const toggle = (e: any, option: string) => {
    if (multiple) {
      if (e.target.checked) fields.push(option);
      else fields.remove(option);
    } else {
      if (e.target.checked) {
        fields.remove(0);
        fields.push(option);
      } else {
        fields.remove(option);
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      {options.map(option => (
        <Box key={option.value} mr={2} display="flex" alignItems="center">
          <FormControlLabel
            label={option.label != null ? option.label : option.value}
            control={
              <Checkbox
                checked={fields.value != null && fields.value.includes(option.value)}
                value={option.value}
                color="secondary"
                onChange={event => toggle(event, option.value)}
              />
            }
          />
        </Box>
      ))}
    </Box>
  );
};
