import * as React from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { Remove } from '@material-ui/icons';
import { Add } from '@material-ui/icons';

interface OwnProps {
  /** Name of the field */
  name: string;
  /** Value of the field */
  value: number;
  /** Callback called whenever the value changes */
  onChange: (value: number) => void;
}

/** Renders a number field with two buttons around it to increment or decrement its value */
export const IncrementalField: React.FC<OwnProps> = ({ name, value, onChange }) => {
  const inputProps = {
    readOnly: true,
    inputProps: {
      className: 'text-center',
    },
  };
  return (
    <div className="d-flex justify-content-between">
      <IconButton
        onClick={() => {
          onChange(value <= 0 ? 0 : value - 1);
        }}
      >
        <Remove />
      </IconButton>
      <TextField
        name={name}
        value={`${value}+`}
        className="px-4"
        variant="outlined"
        InputProps={inputProps}
        onChange={e => {
          const ival = parseInt(e.target.value, 10);
          onChange(isNaN(ival) ? 0 : ival);
        }}
      />
      <IconButton
        onClick={() => {
          onChange(value + 1);
        }}
      >
        <Add />
      </IconButton>
    </div>
  );
};
