import Draggable from 'react-draggable';
import React from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';

const DraggableAction = React.memo((props: PaperProps) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper {...props} />
  </Draggable>
));

export default DraggableAction;
