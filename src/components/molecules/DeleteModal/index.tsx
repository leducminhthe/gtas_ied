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
const DeleteModal:React.FC<{
    isDelete:boolean,
    closeDeleteModal:()=>void,
    handleDeleteDetail:()=>void
}> = ({
  isDelete,
  closeDeleteModal,
  handleDeleteDetail,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={isDelete}
      onClose={closeDeleteModal}
      PaperComponent={DraggableAction}
      aria-labelledby="draggable-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <div style={{ backgroundColor: '#fff', color: '#000' }}>
        <DialogTitle id="alert-dialog-title" classes={{ root: classes.cssDialogTitle }}>
          Delete Modal
        </DialogTitle>
        <DialogContent>
          <DialogContentText classes={{ root: classes.cssContentText }} id="alert-dialog-description">
            Are you sure to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PillButton
            type="submit"
            variant="contained"
            fullWidth={false}
            onClick={handleDeleteDetail}
            style={{ minWidth: '80px' }}
          >
            OK
          </PillButton>
          <PillButton
            type="button"
            variant="contained"
            customColor="error"
            fullWidth={false}
            onClick={closeDeleteModal}
          >
            Close
          </PillButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
