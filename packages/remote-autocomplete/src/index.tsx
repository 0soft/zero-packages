import * as React from 'react';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { TextField, Checkbox, Chip } from '@material-ui/core';
import { Icon } from '@0soft/icon';
import debounce from 'lodash/debounce';
import { useQuery } from '@apollo/client';

const filter = createFilterOptions();

interface RemoteAutocompleteProps {
  queryDocument: any;
  labelProp: string;
  valueProp?: string;
  mapOptions: (res: any) => any[];
  multiple?: boolean;
  onChange: any;
  value: any;
  label?: string;
  size?: 'small' | 'medium' | undefined;
  clearText?: string;
  closeText?: string;
  loadingText?: string;
  noOptionsText?: string;
  openText?: string;
}

const icon = <Icon icon="check_box_outline_blank" />;
const checkedIcon = <Icon icon="check_box" />;

export const RemoteAutocomplete: React.FC<RemoteAutocompleteProps> = ({
  multiple,
  queryDocument,
  labelProp,
  valueProp = labelProp,
  mapOptions,
  onChange,
  value = null,
  label,
  size = 'small',
  clearText,
  closeText,
  loadingText,
  noOptionsText,
  openText,
}) => {
  if (multiple && value == null) {
    value = [];
  }
  const query = useQuery<any, any>(queryDocument, {
    variables: { first: 20, search: '', orderby: ['name'] },
  });
  const [options, setOptions] = React.useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === '') {
      setOptions([]);
    } else {
      fetch(inputValue);
    }
  };

  const fetch = React.useMemo(
    () =>
      debounce((input: string) => {
        try {
          query?.refetch({ first: 20, search: input, orderby: ['name'] });
        } catch (e) {
          // eslint-disable-next-line
          console.error(e);
        }
      }, 400),
    [query]
  );

  React.useEffect(() => {
    let active = true;
    if (active) {
      setOptions(mapOptions(query.data || []));
    }
    return () => {
      active = false;
    };
  }, [query.data, mapOptions]);

  const handleChange = (_: any, v: any) => {
    v = Array.isArray(v)
      ? v.map(it => (typeof it === 'string' ? { [valueProp]: it } : it))
      : typeof v === 'string'
      ? { [valueProp]: v }
      : v;
    onChange(v);
    fetch('');
  };
  return (
    <Autocomplete
      id={`autocomplete-${label}`}
      multiple={multiple}
      clearText={clearText}
      closeText={closeText}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      openText={openText}
      disableCloseOnSelect={multiple}
      autoSelect={!multiple}
      freeSolo
      autoComplete
      getOptionLabel={option => (typeof option === 'string' ? option : option[labelProp])}
      getOptionSelected={(option, v) => {
        option = typeof option === 'string' ? option : option[valueProp];
        v = typeof v === 'string' ? v : option[valueProp];
        return option === v;
      }}
      options={options}
      loading={query.loading}
      onChange={handleChange}
      value={value}
      size={size}
      includeInputInList
      renderInput={params => (
        <TextField {...params} onChange={handleInputChange} label={label} variant="outlined" />
      )}
      renderTags={(v, getTagProps) =>
        v.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            label={
              typeof option === 'string'
                ? option
                : option[labelProp] != null
                ? option[labelProp]
                : option[valueProp]
            }
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderOption={(option, { selected }) => {
        const style = { marginRight: 8 };
        return (
          <>
            {multiple === true && (
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={style} checked={selected} />
            )}
            {typeof option === 'string'
              ? option
              : option.inputOptionLabel != null
              ? option.inputOptionLabel
              : option[labelProp]}
          </>
        );
      }}
      filterOptions={(ops, params) => {
        const filtered = filter(ops, params);
        if (params.inputValue !== '') {
          filtered.push({
            [valueProp]: params.inputValue,
            inputOptionLabel: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
    />
  );
};
