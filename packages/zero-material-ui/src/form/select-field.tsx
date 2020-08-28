import * as React from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
} from '@material-ui/core';

export interface SelectOption {
  value?: any;
  label: string;
  group?: boolean;
  original?: any;
}

interface OwnProps {
  /** The name of the field */
  name: string;
  /** The label of the field */
  label?: string;
  /** Flag to make the field container a full width */
  fullWidth?: boolean;
  /** The value of the field */
  value: any;
  /** Callback called whenever the value changes */
  onChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void;
  /** The field id */
  id?: string;
  /** A list of options that can be selected */
  options: SelectOption[];
  error?: string;
}

export const SelectField: React.FC<OwnProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  id = 'select_field',
  fullWidth = true,
  error,
}) => {
  const labelRef: React.MutableRefObject<any> = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    if (labelRef.current != null) {
      setLabelWidth(labelRef.current.offsetWidth);
    }
  }, [labelRef.current]);

  const select = (
    <Select
      onChange={onChange}
      name={name}
      value={value}
      inputProps={{ id }}
      labelWidth={labelWidth}
    >
      {options.map((it, idx) =>
        it.group ? (
          <div key={idx}>
            <Typography variant="h5" component="p" className="p-3 mt-2">
              {it.label}
            </Typography>
            <Divider />
          </div>
        ) : (
          <MenuItem value={it.value} key={idx}>
            {it.label}
          </MenuItem>
        )
      )}
    </Select>
  );

  return label != null ? (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor={id} ref={labelRef}>
        {label}
      </InputLabel>
      {select}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  ) : (
    select
  );
};
