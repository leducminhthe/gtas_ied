/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  makeStyles,
} from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 21,
    borderRadius: 2,
    padding: '0 6px',
    margin: '2px',
    fontSize: 11,
    backgroundColor: 'rgba(0,0,0,.08);',
  },
  color: {
    width: 8,
    height: 8,
    marginRight: 4,
    borderRadius: '50%',
  },
}));

function MailChip(props:any) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, props.className)} style={props.style}>
      <div className={classes.color} style={{ backgroundColor: props.color }} />
      <div>{props.title}</div>
    </div>
  );
}

export default MailChip;
