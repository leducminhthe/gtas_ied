import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {
  Fade, TextField, InputAdornment, Button,
} from '@mui/material';
import MailChip from 'components/atoms/MailChip';
// import COperationTemplateDialog, { OptionProps } from 'pages/SampleRequestDetail/component/OperationTemplateDialog';
import useStyles from './style';

interface PopperComponentProps {
  // eslint-disable-next-line react/require-default-props
  anchorEl?: any;
  // eslint-disable-next-line react/require-default-props
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    maxHeight: 'unset',
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props: PopperComponentProps) {
  const {
    disablePortal, anchorEl, open, ...other
  } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
  }`,
  borderRadius: 6,
  width: 720,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${
    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
  }`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
      borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
    },
  },
}));

export default function CustomComboBox({
  values, setValue, listZoneTypeState, label, operationNameList,
  dataOperateTemplate,
  setDataOperateTemplate,
  setoperationVRFTP, operationVRFTP,
  disableOperationTemplate,
}:{values:any, setValue:(value:any)=>void, listZoneTypeState:any[], label:string, operationNameList:any[],
  dataOperateTemplate:string, operationVRFTP:[], setDataOperateTemplate:(value:any) =>void,
  setoperationVRFTP:(value:any) =>void, disableOperationTemplate:boolean,
}) {
  // const [value, setValue] = React.useState<LabelType[]>([labels[1], labels[11]]);
  const theme = useTheme();

  const [pendingValue, setPendingValue] = React.useState<any>(Object.keys(values).length > 0 ? values.name : '');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [dataOperateTemplate, setDataOperateTemplate] = React.useState<string>(Object.keys(values).length > 0 ? values.operationString : '');
  const [listOperateTemplate, setListOperateTemplate] = React.useState({});
  // const [operationVRFTP, setoperationVRFTP] = React.useState<any>(Object.keys(values).length > 0 ? values.operationVerifyTP : []);

  const handleClickOpenOperationTemplateDialog = () => {
    setOpenDialog(true);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // setPendingValue(operationNameList[0] || '');
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (text: string) => {
    const datafilter = listZoneTypeState.filter((ele: any) => ele.name.includes(text));
    if (datafilter.length > 0) {
      setListOperateTemplate(datafilter[0]);
      setPendingValue(datafilter[0].name);
      setValue(datafilter[0]);
      setDataOperateTemplate(datafilter[0].operationString);
      setoperationVRFTP(datafilter[0].operationVerifyTP);
      return;
    }
    setListOperateTemplate({});
    setPendingValue('');
    setValue({});
    setDataOperateTemplate('');
  };

  const handleCloseOperationTemplateDialog = () => {
    setOpenDialog(false);
  };

  const classes = useStyles();
  const handleClose = () => {
    if (pendingValue === '') {
      setValue(listOperateTemplate);
    }
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };
  const open = (Boolean(anchorEl) && !disableOperationTemplate);
  const id = open ? 'github-label' : undefined;

  return (
    <div style={{ width: '100%' }}>
      <Box style={{ display: 'flex', width: '100%' }}>
        <TextField
          disabled={disableOperationTemplate}
          fullWidth={true}
          onClick={handleClick}
          size="small"
          className={classes.dateCss}
          style={{ width: '100%', border: 0 }}
          value={pendingValue}
          inputProps={{ 'aria-readonly': true }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownOutlinedIcon />
              </InputAdornment>
            ),
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          // style={{ borderRadiusTopRight: '0' }}
          label={label}
          variant="outlined"
        />
      </Box>
      <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={handleClose}>
          <div style={{ /* width: '20px !important', */ height: '400px', overflow: 'scroll' }}>
            {/* <Autocomplete
              disablePortal={true}
              id="combo-box-demo"
              options={operationNameList}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            /> */}
            <Autocomplete
              disablePortal={true}
              id="combo-box-demo"
              open={true}
              multiple={false}
              style={{ maxHeight: 'unset' }}
              onClose={(
                event: React.ChangeEvent<{}>,
                reason: AutocompleteCloseReason,
              ) => {
                if (reason === 'escape') {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === 'keydown'
                  && (event as React.KeyboardEvent).key === 'Backspace'
                  && reason === 'removeOption'
                ) {
                  return;
                }

                handleChange(newValue);
              }}
              disableCloseOnSelect={true}
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li
                  {...props}
                  key={option}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: pendingValue === option ? '#ccc' : 'none',
                  }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      // '& span': {
                      //   color:
                      //     theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                      // },
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      // flexWrap: 'wrap',
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      {option}
                    </h4>
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', borderLeft: '2px solid hsla(0, 0%, 0%, 0.32)', marginTop: '0.25rem',
                    }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'block', fontSize: '14px', letterSpacing: '1px', minWidth: '100px', paddingLeft: '0.5rem',
                        }}
                        >
                          Operations:
                        </span>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {listZoneTypeState.find((item: any) => item.name === option).operationString.split(',').map((labelRender: any, index: number) => {
                            const returnColor = () => {
                              switch (index) {
                                case 0: return '#FFF4A3';
                                case 1: return 'red';
                                case 2: return 'blue';
                                case 3: return 'green';
                                case 4: return 'yellow';
                                case 5: return 'orange';
                                case 6: return 'black';
                                default: return '#96D4D4';
                              }
                            };
                            return <MailChip key={labelRender} title={`${labelRender.trim().toUpperCase()}`} color={returnColor()} />;
                          })}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {listZoneTypeState.find((item: any) => item.name === option)?.operationVerifyTP.map((ele: any) => ele.operationName).length > 0 && (
                        <span style={{
                          display: 'block', fontSize: '14px', letterSpacing: '1px', minWidth: '100px', paddingLeft: '0.5rem',
                        }}
                        >
                          Verify TP:
                        </span>
                        )}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                          {listZoneTypeState.find((item: any) => item.name === option).operationVerifyTP.map((ele: any) => ele.operationName).map((labelRender: any, index: number) => {
                            const returnColor = () => {
                              switch (index) {
                                case 0: return '#FFF4A3';
                                case 1: return 'red';
                                case 2: return 'blue';
                                case 3: return 'green';
                                case 4: return 'yellow';
                                case 5: return 'orange';
                                case 6: return 'black';
                                default: return '#96D4D4';
                              }
                            };
                            return <MailChip key={labelRender} title={`${labelRender.trim().toUpperCase()}`} color={returnColor()} style={{ background: '#607d8b4d' }} />;
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </li>
              )}
              options={operationNameList}
              isOptionEqualToValue={(option: any, value: any) => value === option}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  // placeholder={`Filter ${label}`}
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
      <>
      </>
    </div>
  );
}
