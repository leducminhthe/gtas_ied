import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Theme,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import PillButton from 'components/atoms/Buttons/PillButton';
import React from 'react';
import DraggableAction from '../DraggableAction';

const useStyles = makeStyles((theme: Theme) => createStyles({
  cssDialogTitle: {
    '& .MuiTypography-h6': {
      fontWeight: 700,
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
      fontSize: '1.7rem',
      textAlign: 'left',
      color: theme.palette.primary.main,
    },
  },
  cssContentText: {
    letterSpacing: '0.1rem',
    fontSize: '1.25rem',
    fontWeight: 400,
    textAlign: 'center',
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
  },
}));
const CancelModal:React.FC<{
      isDelete:boolean,
      closeCencelModal:()=>void,
      handleCancel:()=>void
  }> = ({
    isDelete,
    closeCencelModal,
    handleCancel,
  }) => {
    const classes = useStyles();
    return (
      <Dialog
        open={isDelete}
        PaperComponent={DraggableAction}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <div style={{ backgroundColor: '#fff', color: '#000' }}>
          <DialogContent>
            <DialogContentText classes={{ root: classes.cssContentText }} id="alert-dialog-description">
              Are you sure to cancel ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <PillButton
              type="submit"
              variant="contained"
              fullWidth={false}
              onClick={handleCancel}
              style={{ minWidth: '80px' }}
            >
              OK
            </PillButton>
            <PillButton
              type="button"
              variant="contained"
              customColor="error"
              fullWidth={false}
              onClick={closeCencelModal}
            >
              Close
            </PillButton>
          </DialogActions>
        </div>
      </Dialog>
    );
  };

export default CancelModal;
