import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100vw',
    overflowX: 'hidden',
    backgroundColor: 'red',
  },
  cssContentBelowLaptop: {
    width: '125vw',
    height: '125vh',
    transform: 'scale(0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    transformOrigin: 'left top',
  },
  content: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 0,
    width: 'calc(100vw - 255px)',
    height: '100vh',
    position: 'relative',
  },
  overrideHeight: {
    minHeight: '100vh !important',
    height: '100%',
  },
  contentShift: {
    width: 'calc(100vw - 275px)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentBackground: {
    backgroundColor: '#444951',
    // height: '100%',
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  link: {
    '&:not(:first-child)': {
      paddingLeft: 15,
    },
  },
}));
