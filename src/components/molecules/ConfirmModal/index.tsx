import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Theme, TextField,
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
const ConfirmModal:React.FC<{
      isOpen:boolean,
      closeOpenTransferModal:()=>void,
      handleOk:()=>void,
      content:string,
      setRemarksTranFers:any
  }> = ({
    isOpen,
    closeOpenTransferModal,
    handleOk,
    content = '',
    setRemarksTranFers,
  }) => {
    const classes = useStyles();
    return (
      <Dialog
        open={isOpen}
        PaperComponent={DraggableAction}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="xs"
      >
        <div style={{ backgroundColor: '#fff', color: '#000' }}>
          <DialogContent>
            <DialogContentText classes={{ root: classes.cssContentText }} id="alert-dialog-description">
              <div>
                Are you sure to
                {' '}
                {content}
                {' '}
                ?
              </div>
              <div>
                <TextField
                  style={{ width: '100%', marginTop: '15px' }}
                  size="small"
                  type="text"
                  id="outlined-basic"
                  minRows={2}
                  maxRows={8}
                  multiline={true}
                  InputProps={{
                    autoComplete: 'new-password',
                    // readOnly: true,
                  }}
                  onChange={(newValue:any) => {
                    setRemarksTranFers(newValue.target.value);
                  }}
                      /* error={!!errors?.supplierRemarks}
                      helperText={errors?.supplierRemarks?.message} */
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Remarks"
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: '12px 24px', paddingTop: 0 }}>
            <PillButton
              type="submit"
              variant="contained"
              fullWidth={false}
              onClick={handleOk}
              style={{ minWidth: '80px' }}
            >
              OK
            </PillButton>
            <PillButton
              type="button"
              variant="contained"
              customColor="error"
              fullWidth={false}
              onClick={closeOpenTransferModal}
            >
              Close
            </PillButton>
          </DialogActions>
        </div>
      </Dialog>
    );
  };

export default ConfirmModal;
