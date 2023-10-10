import { Box, Button, TextField } from '@mui/material';
import { AppContext } from 'context/GridContext';
import React, { useContext, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const InputFormCopyPaste:React.FC<{
    // eslint-disable-next-line react/require-default-props
    onChange?:(e?:any)=>void,
    defaultValue: string | number,
    name:string,
    data:any,
    // eslint-disable-next-line react/require-default-props
    hidden?:boolean,
    // eslint-disable-next-line react/require-default-props
    searchUserName?:string,
  }> = ({
    defaultValue,
    name,
    data,
    hidden = false,
    searchUserName = '',
    onChange,
  }) => {
    const { control } = useFormContext();
    const {
      idEdit, isAdding, isEditing,
    } = useContext(AppContext);
    const checkFlag = useMemo(() => {
      if (isAdding && data.id === 0) {
        return false;
      }
      if (isEditing && data.id === idEdit.id) {
        return false;
      }
      return true;
    }, [data, idEdit, isAdding, isEditing]);
    //  const layoutState: any = useLayoutState();
    // const classesDarkmode = useStyleDarkmode({ toggle: layoutState.isDarkMode });
    if (checkFlag) {
      return <span>{defaultValue}</span>;
    }
    return (
      <>
        {hidden && <span>{defaultValue}</span>}
        <Box sx={{
          display: hidden ? 'inline-block' : 'flex', alignItems: 'center', opacity: hidden ? 0 : 1, marginTop: '5px',
        }}
        >
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ ref, ...rest2 }) => (
              <TextField
                style={{
                  width: hidden ? 0 : '100%', border: 0,
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
                type="text"
                inputProps={{
                  hidden,
                  style: {
                    width: '100%',
                    height: 30,
                    padding: '0px 5px',
                  },
                }}
                onChange={onChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                  style: {
                    width: '100%',
                    height: 30,
                    padding: '2.5px 0px 2.5px 5px',
                  },
                }}
              />

            )}
          />
          {
            searchUserName === 'searchUserName' && (
            <div style={{ width: '40px' }}>
              <Button><SearchOutlinedIcon /></Button>
            </div>
            )
          }

        </Box>
      </>
    );
  };

export default InputFormCopyPaste;
