import {
  createStyles, makeStyles,
} from '@mui/styles';

const useStyles = makeStyles((theme: any) => createStyles({
  root: {
    flexGrow: 1,
  },
  inputText: {
    padding: '14px',
  },
  margin8: {
    margin: '8px 0 0 0',
  },
  noPadding: {
    padding: '0',
  },
  subjectCss: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '10px',
    width: '100%',
    '& textarea': {
      width: '100%',
      minHeight: '125px',
    },
  },
  dateCss: {
    '& .MuiInputBase-adornedEnd': {
      paddingRight: '5px',
    },
    '& .MuiInputAdornment-positionEnd': {
      '& button': {
        padding: 0,
      },
    },
    '& .MuiOutlinedInput-root': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
  },
  customLabel: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    pointerEvents: 'none',
    transform: 'translate(14px, 20px) scale(1)',
    transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    transformOrigin: 'top left',
    display: 'block',
    zIndex: 5,
    color: 'rgba(0, 0, 0, 0.57)',
    background: 'white',
    padding: '0 3px',
    fontSize: '1rem',
  },
  redLabel: {
    color: '#D0111B',
  },
  focusLabel: {
    color: theme.palette.primary.main,
    transform: 'translate(14px, 3px) scale(0.75)',
  },
  textareaAutosizeStyle: {
    resize: 'both',
    overflow: 'hidden',
    margin: '0px',
    minWidth: '100px',
    padding: '23px 14px',
    position: 'relative',
    borderRadius: '4px',
    color: 'rgba(0, 0, 0, 0.87)',
    borderColor: 'rgba(0, 0, 0, 0.27)',
    outline: 'none',
    maxWidth: '100%',
    maxHeight: '75vh',
    fontSize: '1rem',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: 400,
    lineHeight: '1.1876em',
    letterSpacing: '0.00938em',
  },
  textCssFocus: {
    borderColor: theme.palette.primary.main,
  },
  NotfocusLabel: {
    color: 'rgba(0, 0, 0, 0.57)',
    transform: 'translate(14px, 3px) scale(0.75)',
  },
}));

export default useStyles;
