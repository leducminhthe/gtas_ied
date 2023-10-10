import { makeStyles } from '@mui/styles';

export default makeStyles((theme: any) => ({
  cssTableCell: {
    '& .MuiToolbar-root': {
      color: theme.palette.text.default,
      '& .MuiInputBase-root': {
        '& select option': {
          color: '#000',
        },
        '& svg': {
          color: theme.palette.text.default,
        },
      },
      '& .MuiBox-root button': {
        color: theme.palette.paginationButton.normal,
        '&.Mui-disabled': {
          color: theme.palette.paginationButton.disabled,
        },
      },
    },
    // '& svg': {
    //   color: theme.palette.text.default,
    // },
  },
}));
