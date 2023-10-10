import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  wrapper: {
    width: '100%',
    height: '80%',
    padding: 0,
    marginTop: 5,
  },
  img: {
    width: '100%',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    // paddingTop: '5vh',
    width: '100%',
    gap: theme.spacing(2),
    // minHeight: '90vh',
    // backgroundColor: 'white',
  },
  description: {
    color: 'white',
  },
  gridLayout: {
    width: '100%',
    height: '100%',
    padding: 25,
  },
  title: {
    textAlign: 'left',
    marginBottom: '1rem',
    display: 'flex',
    // justifyContent: 'center',
    fontSize: '50px',
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  subTitle: {
    // color: theme.palette.grey[600],
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.125,
  },
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
  cardItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // height: theme.spacing(15),
    // width: theme.spacing(15),
  },
  button: {
    border: `3px solid ${theme.palette.grey[800]}`,
    borderRadius: '10px',
    padding: '1.5rem 2.4rem',
    width: '100%',
    minWidth: '300px',
    margin: theme.spacing(1),
    color: theme.palette.grey[800],
    '& > *': {
      marginRight: 'auto',
    },
    '& svg': {
      fontSize: '3rem',
      '& > path': {
        fill: theme.palette.grey[800],
      },
    },
    '&:hover': {
      background: theme.palette.secondary.light,
      borderColor: theme.palette.primary.main,
    },
  },
}));
export default useStyles;
