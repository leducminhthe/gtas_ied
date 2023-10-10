import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 30,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  icon: {
    fill: '#FFFFFF',
    color: 'white',
  },
  blackLayer: {
    width: '100%', height: '100%', backgroundColor: 'black', position: 'absolute', opacity: 0.6,
  },
  imgWrapper: {
    position: 'absolute', width: '100%', height: '100%',
  },
  backgroundWrapper: {
    position: 'relative', width: '100%', height: '100vh',
  },
  autoFill: {
    borderRadius: 0,
    '&:-webkit-autofill': {
      borderRadius: '0px !important',
      color: 'white !important',
      WebkitBoxShadow: '0 0 0 30px #0a0f14 inset',
      WebkitTextFillColor: 'white !important',
    },

  },
  logo: {
    width: 175,
    height: 50,
  },
  title: {
    color: 'black',
    fontWeight: 700,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textAlign: 'right',
  },
  imgCss: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    zIndex: -999,
  },
  textWhite: {
    color: 'white !important',
  },
  InputStyle: {
    backgroundColor: '#0a0f14',
    color: 'white !important',
  },
  diaLogCss: {
    minHeight: 250,
    minWidth: 200,
    width: '100%',
    maxHeight: 450,
    maxWidth: 400,
    height: '100%',
    padding: '25px',
    backgroundColor: '#171b26',
    borderRadius: '0.5rem',
    // boxShadow: 'rgba(100, 100, 111, 0.5) 0px 7px 29px 0px',
    boxShadow: 'rgba(0, 0, 0, 0.5) 0px 13px 27px -5px, rgba(0, 0, 0, 0.5) 16px 32px 16px -2px',
  },
  flexCenter: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  cssTitle: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  selectStyle: {
    color: 'white !important',
  },
  notchedOutline: {
    // NOTE: the legend element is a child of the notchedOutline component
    color: 'white !important',
    border: '1px solid white !important',
    '& legend': {
      maxWidth: '1000px',
    },
  },
  cssFormControl: {
    margin: '16px 0px',
  },
  cssButton: {
    padding: '8px 22px',
    fontWeight: 700,
    textAlign: 'right',
  },
  inputField: {
    backgroundColor: '#0a0f14',
    color: 'red',
  },
}));
export default useStyles;
