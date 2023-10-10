/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import { Box, InputAdornment, TextField } from '@mui/material';
import { AppContext } from 'context/GridContext';
import React, { useContext, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';

const InputForm: React.FC<{
  readOnly?: string;
  typeInput?: string;
  defaultValue: string | number;
  name: string;
  data: any;
  // eslint-disable-next-line react/require-default-props
  hidden?: boolean;
  // eslint-disable-next-line react/require-default-props
  searchUserName?: string;
  openModalTable?: () => void;
  siteFlag?: boolean;
}> = ({
  defaultValue,
  name,
  data,
  hidden = false,
  searchUserName = '',
  openModalTable,
  siteFlag = false,
  typeInput = '',
  readOnly = '',
}) => {
  const { control } = useFormContext();
  const { idEdit, isAdding, isEditing } = useContext(AppContext);
  const checkFlag = useMemo(() => {
    if (siteFlag) {
      if (isEditing && data.userName === idEdit.userName) {
        return false;
      }
    } else {
      if (isAdding && data.id === 0) {
        return false;
      }
      if (isEditing && data.id === idEdit.id) {
        return false;
      }
    }
    return true;
  }, [data, idEdit, isAdding, isEditing]);
  //  const layoutState: any = useLayoutState();
  // const classesDarkmode = useStyleDarkmode({ toggle: layoutState.isDarkMode });

  const handleOpen = () => {
    openModalTable && openModalTable();
  };

  const checkTypeInput = useMemo(() => {
    if (typeInput === 'email') {
      return 'email';
    }
    return 'text';
  }, [typeInput]);
  const checkReadOnly = useMemo(() => {
    if (readOnly === 'readOnly') {
      return true;
    }
    return false;
  }, [readOnly]);
  if (checkFlag) {
    return <span>{defaultValue}</span>;
  }
  return (
    <>
      {hidden && <span>{defaultValue}</span>}
      <Box
        sx={{
          display: hidden ? 'inline-block' : 'flex',
          alignItems: 'center',
          opacity: hidden ? 0 : 1,
          marginTop: '5px',
        }}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ ref, ...rest2 }) => (
            <TextField
              style={{
                width: hidden ? 0 : '100%',
                border: 0,
              }}
              ref={ref}
              inputRef={ref}
              {...rest2}
              size="small"
              hidden={hidden}
              hiddenLabel={hidden}
              id="outlined-basic"
              variant="outlined"
              name={name}
              // className={classesDarkmode.selected}
              type={checkTypeInput}
              inputProps={{
                hidden,
                style: {
                  width: '100%',
                  height: 30,
                  padding: '0px 5px',
                },
              }}
              autoFocus
              InputLabelProps={{
                shrink: true,
                style: {
                  width: '100%',
                  height: 30,
                  padding: '2.5px 0px 2.5px 5px',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchUserName === 'searchUserName' && (
                      <IconButton onClick={handleOpen} edge="end">
                        <SearchOutlinedIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
                readOnly: checkReadOnly,
              }}
            />
          )}
        />
      </Box>
    </>
  );
};

export default InputForm;
