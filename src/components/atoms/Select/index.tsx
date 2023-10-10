/* eslint-disable react/require-default-props */
import { Autocomplete, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { AppContext } from 'context/GridContext';
import React, { useContext, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import useStyles from './styles';

export const getHighlightedText = (text: string, highlight: string) => {
  // Split text on highlight term, include term itself into parts, ignore case
  const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {parts.map((part: string) => (part.toLowerCase() === highlight.toLowerCase() ? (
        <span
          style={{
            color: '#e17055',
          }}
        >
          {part}
        </span>
      ) : (
        part
      )))}
    </span>
  );
};

const ControlledSelect: React.FC<{
  // eslint-disable-next-line react/require-default-props
  data: any;
  name: string;
  defaultValue: string;
  optionData: Array<any>;
  size?: any;
  label?: string;
  disabled?: boolean;
}> = ({
  data,
  name,
  defaultValue,
  optionData,
  size = 'medium',
  disabled = false,
}) => {
  const classes = useStyles();
  const { control } = useFormContext();
  const { idEdit, isAdding, isEditing } = useContext(AppContext);

  const checkFlag = useMemo(() => {
    if (isAdding && data.id === 0) {
      return false;
    }
    if (isEditing && data.id === idEdit.id) {
      return false;
    }
    return true;
  }, [data, idEdit, isAdding, isEditing]);

  if (checkFlag) {
    return <span>{defaultValue}</span>;
  }

  return (
    <FormControl
      className={classes.Autocomplete}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: disabled ? 'rgb(246, 247, 255)' : 'white',
      }}
      size={size || 'medium'}
    >
      <Controller
        name={name}
        control={control}
        render={({ ref, ...rest }) => (
          <Autocomplete
            id="free-solo-demo"
            sx={{ width: '100%' }}
            ref={ref}
            renderOption={(props, option, { inputValue }) => (
              <li style={{ fontSize: '14px' }} {...props} key={option}>
                {getHighlightedText(option, inputValue)}
              </li>
            )}
            {...rest}
            onChange={(event, newValue) => {
              rest.onChange(newValue);
              // dispatch(setOrderCodeTemp(newValue));
            }}
            options={optionData.map((item: any) => item)}
            renderInput={(params) => <TextField name={name} {...params} />}
          />
        )}
      />
    </FormControl>
  );
};

export default ControlledSelect;
