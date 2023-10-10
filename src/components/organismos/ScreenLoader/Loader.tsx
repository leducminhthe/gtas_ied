import {
  Backdrop, CircularProgress, Theme, Box, LinearProgress,
} from '@mui/material';
import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: 999,
    color: '#fff',
  },
}));

const useStyles2 = makeStyles(() => ({
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
  const classes = useStyles2();

  return (
    <div className={classes.root} title="Carregando...">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        justifyContent="center"
      >
        <CircularProgress className={classes.spinner} />
      </Box>
    </div>
  );
};

const ScreenLoader: React.FC<{
    // eslint-disable-next-line react/require-default-props
    isLoading?: boolean;
  }> = ({ children, isLoading = false }) => {
    const classes = useStyles();
    return (
      <>
        <Backdrop className={classes.backdrop} open={isLoading} onClick={() => {}}>
          <LoadingPage />
        </Backdrop>

        {children}
      </>
    );
  };
export default ScreenLoader;
