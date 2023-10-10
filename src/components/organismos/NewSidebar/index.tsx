/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { FeaturedPlayList, Home as HomeIcon, Assessment as Report } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
// import logo from 'assets/images/Logo1.png';
import clsx from 'clsx';
import PillButton from 'components/atoms/Buttons/PillButton';
import useAuth from 'hooks/useAuth';
import React from 'react';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { useDispatch, useSelector } from 'react-redux';
// import { Store } from 'redux/store';
// import { setIsClose, setIsOpen } from 'redux/ui/drawer/actions';
import { setIsClose, setIsOpen } from 'store/ui';
// import { RootState } from 'redux/index';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useLocation } from 'react-router-dom';
import SidebarLink from '../Sidebar/components/SidebarLink/SidebarLink';
import useStyles from './styles';

// eslint-disable-next-line import/no-anonymous-default-export
export default React.memo(({ location }: any) => {
  const classes = useStyles();
  const mediumSizeIcon = {
    width: '36px',
    height: '36px',
  };
  // const location = useLocation();
  // const [drawerState, setDrawerState] = useState(true);
  const { signout } = useAuth();
  const dispatch = useDispatch();
  const { isOpen: drawerState } = useSelector(
    (state: any) => state?.ui,
  );
  const {
    roles: {
      wfxSampleOrderAccess,
      sampleRequestAccess,
      transactionAccess,
      userPermissionAccess,
      reportAccess,
      mapUserGroupAccess,
      mapUserSiteAccess,
      // bookSRAccess,
      // sampleRequestDetailAccess,
      permissionGroupAccess,
    },
  } = useSelector((reduxState: any) => reduxState.auth);

  const handleCloseOpenClick = () => {
    // setDrawerState(!drawerState);
    if (!drawerState) {
      dispatch(setIsClose(false));
    } else {
      dispatch(setIsOpen(true));
    }
  };

  const structure = [
    {
      id: 0,
      label: 'Library',
      link: '/app/library',
      icon: <HomeIcon />,
      accessible: true,
    },
    {
      id: 1,
      label: 'Process Management',
      link: '/app/mainFunction',
      icon: <WidgetsOutlinedIcon />,
      accessible: true,
      children: [
      ],
    },
    {
      id: 2,
      label: 'Operation',
      link: '/app/operation',
      icon: <AppsIcon />,
      accessible: true,
      children: [
      ],
    },
    {
      id: 3,
      label: 'Report',
      link: '/app/report',
      icon: <Report />,
      accessible: true,
      nested: false,
      children: [
      ],
    },
    {
      id: 4,
      label: 'Sign out',
      link: '/login',
      icon: <ExitToAppOutlinedIcon />,
      accessible: true,
      nested: false,
      children: [
      ],
      callback: signout,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerState,
        [classes.drawerClose]: !drawerState,
      })}
      classes={{
        root: classes.drawer,
        paper: clsx({
          [classes.drawerPaper]: true,
          [classes.drawerOpen]: drawerState,
          [classes.drawerClose]: !drawerState,
        }),
      }}
    >
      <Box className={classes.toolbar}>
        <Box>
          <Box className={classes.logo}>
            {/* <img src={logoIcon} alt="" style={{ height: '40px' }} /> */}
            <Typography className={classes.linkText}>Your Projects</Typography>
          </Box>

          <List id="sidebarLink" className={classes.list} sx={{ marginTop: '1rem' }}>
            {structure
              .filter((item) => item.accessible)
              .map((link) => (
                <SidebarLink
                  key={link.id}
                  location={location}
                  isSidebarOpened={drawerState}
                  {...(link as any)}
                />
              ))}
          </List>
        </Box>

        {/* <Box margin="1rem auto">
          <PillButton
            variant="contained"
            className={classes.logoutButton}
            style={{ display: drawerState ? '' : 'none' }}
            onClick={signout}
          >
            <strong>LOGOUT</strong>
          </PillButton>
        </Box> */}
      </Box>
    </Drawer>
  );
});
