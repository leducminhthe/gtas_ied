import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  Autocomplete: {
    height: '30px !important',
    width: '235px',
    '& .MuiAutocomplete-root': {
      height: '100% !important',
      '& .MuiFormControl-root': {
        height: '100% !important',
        '& .MuiOutlinedInput-root': {
          height: '100% !important',
          padding: '0 5px !important',
          '& input': {
            padding: '0 !important',
          },
        },
      },
    },
  },
  selected: {
    '& .MuiOutlinedInput-root': {
      height: '30px',
      width: '205px',
    },
  },
  default: {},
}));

export default useStyles;
