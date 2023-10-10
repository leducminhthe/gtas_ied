import { makeStyles } from '@mui/styles';
import classnames from 'clsx';
import React from 'react';

// styles
const useStyles = makeStyles((theme:any) => ({
  dotBase: {
    width: 8,
    height: 8,
    // backgroundColor: theme.palette.text.hint,
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: theme.transitions.create('background-color'),
  },
  dotSmall: {
    width: 5,
    height: 5,
  },
  dotLarge: {
    width: 11,
    height: 11,
  },
}));

const Dot:React.FC<any> = ({ size }) => {
  const classes = useStyles();

  return (
    <div
      className={classnames(classes.dotBase, {
        [classes.dotLarge]: size === 'large',
        [classes.dotSmall]: size === 'small',
      })}
      style={{
        backgroundColor: 'white',
      }}
    />
  );
};
export default Dot;
