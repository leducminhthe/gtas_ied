/* eslint-disable max-len */
import {
  Box,
  Grid,
  MenuItem,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import {
  SupervisorAccount,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
// import logo from 'assets/images/Logo1.png';
import PillButton from 'components/atoms/Buttons/PillButton';
import useAuth from 'hooks/useAuth';
// import { useSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SeverEnum } from 'types/authType';
import { toast } from 'react-toastify';
import useStyles from './style';

const Login: React.FC = () => {
  const { signin } = useAuth();
  const classes = useStyles();
  const theme: any = useTheme<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<any>(null);
  const history = useHistory();
  const [server, setServer] = React.useState<SeverEnum>(SeverEnum.Live);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  // const { enqueueSnackbar } = useSnackbar();
  // const dispatch = useDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    setServer(event.target.value as SeverEnum);
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = ref.current.elements;
    const id = form.ID.value;
    const password = form.password.value;

    // validate inputs
    if (!id || !password) {
      toast.error('Error', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // enqueueSnackbar('Error', { variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      await signin(id, password, server);
      // redirect
      redirectDashboard('/app');
    } catch (error: any) {
      if (error?.response?.status === 500) {
        toast.error('Server Error', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // enqueueSnackbar('Server Error', { variant: 'error' });
        return;
      }

      // BE return 2 diff type of responses, zzz
      // if (!error?.response) return;
      const errorResponse = error?.response?.data?.errors || error?.response?.data;
      if (errorResponse?.length && Array.isArray(errorResponse)) {
        errorResponse.forEach((err: any) => {
          // enqueueSnackbar(err.defaultMessage ? err.defaultMessage : err.error, { variant: 'error' });
          toast.error(err.defaultMessage ? err.defaultMessage : err.error, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else {
        toast.error(
          error?.message
            || error?.response?.data?.defaultMessage
            || error?.response?.error
            || error?.response?.data?.message
            || error?.message
            || String(error?.response?.data)
            || 'Server Error',
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
        // enqueueSnackbar(error?.message || error?.response?.data?.defaultMessage || error?.response?.error || error?.response?.data?.message || error?.message || String(error?.response?.data || 'Server Error'), { variant: 'error' });
      }
    }
    setLoading(false);
  };

  const redirectDashboard = (path: string = '/app') => {
    const { state }: any = history;
    history.push(state?.from?.pathname || path);
  };
  return (
    <Grid container={true} style={{ padding: 0, flexGrow: 1 }}>
      <Grid item={true} xs={12} className={classes.backgroundWrapper}>
        <Box className={classes.imgWrapper}>
          <div className={classes.blackLayer} />
        </Box>
        <Box
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        >
          <Grid container={true} className={classes.flexCenter}>
            <Grid item={true} xs={12} md={6}>
              <div className={classes.paper}>
                <div className={classes.diaLogCss}>
                  <div className={classes.cssTitle}>
                    <Typography style={{ color: 'white' }} component="h1" variant="h2" className={classes.title}>
                      Title
                    </Typography>
                    <img alt="logo GTAS" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a3ec529632909.55fc107b84b8c.png" className={classes.logo} />
                  </div>
                  <form
                    ref={ref}
                    className={classes.form}
                    noValidate={true}
                    onSubmit={submit}
                  >
                    <FormControl
                      fullWidth={true}
                      error={false}
                      style={{
                        ...theme.typography.customInput,
                        marginBottom: 25,
                      }}
                    >
                      <InputLabel
                        className={classes.textWhite}
                        htmlFor="outlined-adornment-user-login"
                      >
                        Username
                      </InputLabel>
                      <OutlinedInput
                        id="id"
                        type="text"
                        name="ID"
                        className={classes.InputStyle}
                        inputProps={{
                          className: classes.autoFill,
                        }}
                        endAdornment={(
                          <InputAdornment position="end">
                            <SupervisorAccount
                              fontSize="large"
                              className={classes.textWhite}
                            />
                          </InputAdornment>
                        )}
                        label="Password"
                        fullWidth={true}
                      />
                    </FormControl>
                    <FormControl
                      fullWidth={true}
                      error={false}
                      style={{
                        ...theme.typography.customInput,
                        marginBottom: 25,
                      }}
                    >
                      <InputLabel
                        className={classes.textWhite}
                        htmlFor="outlined-adornment-password-login"
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={classes.InputStyle}
                        inputProps={{
                          className: classes.autoFill,
                        }}
                        endAdornment={(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                              className={classes.textWhite}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )}
                        label="Password"
                      />
                    </FormControl>

                    <FormControl fullWidth={true}>
                      <InputLabel
                        className={classes.textWhite}
                        shrink={true}
                        id="server-select-label"
                      >
                        Server
                      </InputLabel>
                      <Select
                        id="server"
                        labelId="server-select-label"
                        value={server}
                        className={classes.selectStyle}
                        input={(
                          <OutlinedInput
                            label="Server"
                            classes={{
                              notchedOutline: classes.notchedOutline,
                            }}
                          />
                        )}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                        onChange={handleChange}
                      >
                        <MenuItem key="1" value={SeverEnum.Live}>
                          Live
                        </MenuItem>
                        <MenuItem key="2" value={SeverEnum.Test}>
                          Test
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <Box className={classes.submit}>
                      <PillButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        loading={loading}
                        className={classes.cssButton}
                      >
                        Login
                      </PillButton>
                    </Box>
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
