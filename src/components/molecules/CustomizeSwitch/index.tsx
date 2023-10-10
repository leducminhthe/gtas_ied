import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

const ResultSwitch = styled(Switch)((props) => {
  const { checked } = props;
  return ({
    padding: 8,
    '& .MuiSwitch-input': {
      left: '0% !important',
      width: '100% !important',
    },
    '& .MuiSwitch-switchBase': {
      '&.Mui-checked': {
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: checked !== undefined ? 'rgb(76, 175, 80)' : 'gray',
        },
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      backgroundColor: checked !== undefined ? 'rgb(239, 83, 80)' : 'gray',
      opacity: 1,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
        color: 'green',
      },
      '&:before': {
        backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>\')',
        left: 12,
      },
      '&:after': {
        backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M19,13H5V11H19V13Z" /></svg>\')',
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
      backgroundColor: 'white',
    },

  });
});

export const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
  '& .MuiSwitch-track.Mui-disabled': {
    opacity: 'none',
  },
}));

// eslint-disable-next-line react/require-default-props
const CustomizedSwitches:React.FC<{toggle:boolean, setToggle:any, isDisabled?:boolean, label?:string}> = ({
  toggle = false, setToggle, isDisabled = false, label = 'Show List Pending Styles',
}) => (
  <FormGroup>
    <FormControlLabel
      control={(
        <Tooltip title={<span style={{ fontSize: '15px' }}>{label}</span>} placement="top">
          <ResultSwitch checked={toggle} disabled={isDisabled} />
        </Tooltip>
      )}
      label=""
      onChange={(e:any) => setToggle(e.target.checked)}
    />
  </FormGroup>
);
export default CustomizedSwitches;
