import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => createStyles({
  root: {
    flexGrow: 1,
  },
  height100: {
    height: '100%',
  },
  question: {
    // padding: '0.5rem 1rem',

  },
  btn: {
    borderColor: 'transparent',
    width: '2rem',
    height: '2rem',
    background: '#eae6eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: '#b4345c',
    cursor: 'pointer',
    marginLeft: '1rem',
    alignSelf: 'center',
    minWidth: '2rem',
  },

}));

export default useStyles;
