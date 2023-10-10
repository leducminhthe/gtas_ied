import React from 'react';

import { Box, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Page from './ScreenLoader';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },

  spinner: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const LoadingPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Loading...">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <LinearProgress className={classes.spinner} />
      </Box>
    </Page>
  );
};

export default React.memo(LoadingPage);
