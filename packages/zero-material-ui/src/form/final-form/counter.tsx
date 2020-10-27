import React, { useCallback } from 'react';
import { Field } from 'react-final-form';
import { IconButton, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

interface CounterBaseProps {
  title: string;
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const CounterBase: React.FC<CounterBaseProps> = ({
  title,
  value = 0,
  min = 0,
  max = Infinity,
  onChange,
}) => {
  const setIncrement = useCallback(
    (increment: number) => {
      const newValue = value + increment;
      if (newValue > max || newValue < min) {
        return;
      }

      onChange(newValue);
    },
    [value, min, max, onChange]
  );

  return (
    <div className="counter-container">
      <Typography variant="h2" component="h2" color="textSecondary">
        {title}
      </Typography>
      <div className="counter">
        <IconButton onClick={() => setIncrement(-1)}>
          <RemoveIcon />
        </IconButton>
        <Typography variant="h3" component="h3" color="textSecondary">
          {value}
        </Typography>
        <IconButton onClick={() => setIncrement(1)}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

interface CounterProps {
  name: string;
  title: string;
}

export const Counter: React.FC<CounterProps> = ({ name, title }) => {
  return (
    <Field
      name={name}
      render={({ input }) => {
        return (
          <CounterBase
            title={title}
            value={parseInt(input.value, 10) || 0}
            onChange={input.onChange}
          />
        );
      }}
    />
  );
};

export default Counter;
