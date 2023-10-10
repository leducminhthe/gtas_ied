import { ButtonBase } from '@mui/material';
import { withStyles } from '@mui/styles';

const RoundedDeleteButton = withStyles(({ palette }) => ({
  root: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    background: palette.primary.main,
    transition: 'opacity 0.2s linear',
    '&:before': {
      content: '""',
      position: 'absolute',
      width: '14px',
      height: '2px',
      background: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '2px',
      height: '14px',
      background: 'white',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
    },
    '&:hover': {
      opacity: 0.6,
    },
  },
}))(ButtonBase);
export default RoundedDeleteButton;
