import React from 'react';

import { Field } from 'react-final-form';
import { IconButton, Typography } from '@material-ui/core';

import { Icon } from '../../../icon/src/icon';

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
  const setIncrement = React.useCallback(
    (increment: number) => {
      const newValue = value + increment;
      if (newValue > max || newValue < min) {
        return;
      }

      onChange(newValue);
    },
    [value]
  );

  return (
    <div className="counter-container">
      <Typography variant="h2" component="h2" color="textSecondary">
        {title}
      </Typography>
      <div className="counter">
        <IconButton onClick={() => setIncrement(-1)}>
          <Icon icon="remove" />
        </IconButton>
        <Typography variant="h3" component="h3" color="textSecondary">
          {value}
        </Typography>
        <IconButton onClick={() => setIncrement(1)}>
          <Icon icon="add" />
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
