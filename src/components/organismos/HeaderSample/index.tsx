/* eslint-disable react/require-default-props */
import React from 'react';
// import { Upload as ImportIcon, Download as ExportIcon } from 'react-feather';

import {
  Box,
  Button,
  Grid,
  Typography,
  ButtonProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  buttonExport: {
    marginLeft: 10,
  },
}));

type IParams = {
  title: string;
  topic?: string;
  rightButtonTitle?: string;
  rightButtonProps?: ButtonProps;
  importExport?: boolean;
};

const HeaderSample: React.FC<IParams> = (props) => {
  const {
    title,
    topic,
    rightButtonProps,
    rightButtonTitle,
    importExport,
  } = props;
  const classes = useStyles();

  return (
    <Grid container={true} spacing={3} sx={{ justifyContent: 'space-between', display: 'flex' }}>
      <Grid item={true}>
        {!!topic && (
          <Typography component="h2" gutterBottom={true} variant="overline">
            {topic}
          </Typography>
        )}
        <Typography component="h1" variant="h3">
          {title}
        </Typography>

        {/* {importExport && (
          <Box marginTop={2}>
            <Button startIcon={<ImportIcon size={18} />}>Importar</Button>
            <Button
              startIcon={<ExportIcon size={18} />}
              className={classes.buttonExport}
            >
              Exportar
            </Button>
          </Box>
        )} */}
      </Grid>
      {!!rightButtonTitle && (
        <Grid item={true}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            {...rightButtonProps}
          >
            {rightButtonTitle}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default HeaderSample;
