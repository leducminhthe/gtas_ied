import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme:any) => ({
  buttonProgress: {
    position: 'absolute',
  },
  error_contained: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  dark_contained: {
    background: '#041631',
    color: 'white',
    '&:hover': {
      background: '#041631',
    },
    textTransform: 'capitalize',
  },
  success_contained: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.background.default,
    '&:hover': {
      background: theme.palette.success.dark,
    },
    letterSpacing: '1px',
  },
  error_text: {
    color: theme.palette.error.main,
  },
  success_text: {
    color: theme.palette.success.main,
  },
  dark_text: {
    color: '#041631',
    textTransform: 'capitalize',
  },
  none_text: {
    color: '#041631',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  default: {},
}));

export default useStyles;
