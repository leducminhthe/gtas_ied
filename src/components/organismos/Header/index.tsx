import React, { useEffect, useMemo, useState } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Box,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import {
  Person as AccountIcon,
  DensityMedium as DensityMediumIcon,
  Assignment as Report,
} from '@mui/icons-material';
import DnsIcon from '@mui/icons-material/Dns';
import FolderIcon from '@mui/icons-material/Folder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import newLogo from 'assets/images/empty-box.png';
import {
  useHistory, useParams, useLocation, Link,
} from 'react-router-dom';
import PillButton from 'components/atoms/Buttons/PillButton';
// styles
import useAuth from 'hooks/useAuth';
import {
  makeStyles, createStyles,
} from '@mui/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setIsClose, setIsOpen } from 'store/ui';
import { privateRoutes } from 'router/routes';
import { flattenRouteArr } from 'router/routeMethod';
import { getLocalStorage } from 'utils/authUtil';
import MenuList from './Menu/MenuList';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export function IconBreadcrumbs({ location }:any) {
  const breadcrumbsLink = location.pathname?.split('/')?.filter((ele:any) => ele && ele !== 'app');
  const targetBreadcrumbs = React.useMemo(() => {
    const targetTitleFirst = flattenRouteArr(privateRoutes).find((ele) => ele.path === `/${breadcrumbsLink[0]}`);
    const target = flattenRouteArr(privateRoutes).find((ele) => `/app${ele.path}` === location.pathname);

    if (breadcrumbsLink[0] === 'costsheetManagement' || targetTitleFirst?.title === 'costsheetManagement' || target?.title === 'costsheetManagement') {
      return ['Costsheet Management'];
    }
    if (target && targetTitleFirst && target.title === '') {
      return [targetTitleFirst.title];
    }

    if (target && targetTitleFirst) {
      breadcrumbsLink[0] = targetTitleFirst.title;
      breadcrumbsLink[1] = target.title;
      return breadcrumbsLink;
    }

    return breadcrumbsLink;
  }, [location, breadcrumbsLink]);

  return (
    <>
      {targetBreadcrumbs.length > 0 && (
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          {targetBreadcrumbs?.length && targetBreadcrumbs.filter((item:any, index: any, self:any) => index === self.findIndex((j: any) => j === item)).map((ele:string, index: number) => (
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              {ele}
            </Typography>
          ))}
        </Breadcrumbs>
      </div>
      )}

    </>
  );
}

const useStyles = makeStyles((theme: any) => createStyles({
  menuItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  subMenuItem: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  liCss: {
    listStyle: 'none',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  detailType: {
    color: '#222',
    fontSize: '1.1rem',
    fontWeight: 600,
    padding: '0px 10px',
  },
  liCssLv1: {
    listStyle: 'none',
    display: 'inline-block',
    position: 'relative',
    zIndex: 1,
  },
  textTitle: {
    color: theme.palette.darkMode.color.main,
    fontWeight: 600,
    fontSize: '1.5rem',
    padding: '0px 5px 0px 5px',
  },
  dropdown: {
    position: 'absolute',
    left: '-10px',
    top: '97px',
    width: '200px',
    background: '#ffffff',
    zIndex: 9,
    opacity: 0,
    visibility: 'hidden',
    transition: 'none',
    boxShadow: '0px 9px 15px rgba(25,25,26, 0.05)',
  },
  aCustomAction: {
    '&:after': {
      position: 'absolute',
      left: 0,
      top: '52px',
      width: '100%',
      height: '2px',
      background: '#dfa974',
      content: '',
      opacity: 0,
      // transition: 'all 0.3s',
    },
  },
  liCustomAction: {
    // '&:hover .dropdown': {
    //   top: '77px',
    //   opacity: 1,
    //   visibility: 'visible',
    // },
    // '& .dropdown': {
    //   top: '77px',
    //   opacity: 1,
    //   visibility: 'visible',
    // },
  },
  cssLink: {
    fontSize: '16px',
    color: '#19191a',
    marginRight: '42px',
    fontWeight: 500,
    display: 'inline-block',
    padding: '16px 0',
    position: 'relative',
    // transition: 'all 0.3s',
    textDecoration: 'none',
    outline: 'none',
    '&:focus': {
      textDecoration: 'none',
      outline: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
      outline: 'none',
    },
  },
  logotype: {
    color: 'black',
    marginLeft: theme.spacing(2.75),
    marginRight: theme.spacing(2.75),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  appBar: {
    width: '100%',
    backgroundColor: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  headerLogo: {
    width: '5rem',
    marginLeft: 3,
    objectFit: 'cover',
    marginBottom: '4px',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '50px',
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  headerIcon: {
    fontSize: 28,
    color: 'rgba(0, 0, 0, 0.35)',
  },
  headerIconCollapse: {
    color: 'black',
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  profileMenu: {
    minWidth: 265,
    top: '25px',
  },
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  messageNotification: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: 'flex-start',
    marginRight: 0,
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'none',
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
  coverButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    '& .MuiIconButton-root': {
      marginRight: 'unset',
    },
  },

}));

const structure = [
  {
    id: 10,
    label: 'Spinning',
    link: '/app/spinning',
    accessible: true,
    pointerEvent: false,
    level: 1,
    children: [
      {
        id: 0,
        label: 'Master Data',
        link: '/app/spinning/library',
        icon: null,
        accessible: true,
        pointerEvent: true,
        level: 2,
      },
      {
        id: 7,
        label: 'Process',
        link: '/app/spinning/mainFunction',
        accessible: true,
        pointerEvent: true,
        level: 2,
        children: [
        ],
      },
      {
        id: 5,
        label: 'Operation',
        link: '/app/spinning/groupOperationTemplate',
        accessible: true,
        pointerEvent: false,
        level: 2,
        icon: null,
        children: [
          {
            id: 7,
            label: 'Operation Template',
            link: '/app/spinning/TemplatePage',
            accessible: true,
            pointerEvent: true,
            level: 3,
            children: [
            ],
          },
          {
            id: 6,
            label: 'Operation Detail',
            link: '/app/spinning/operation',
            // icon: <AppsIcon />,
            accessible: true,
            pointerEvent: true,
            children: [
            ],
            level: 3,
          },
        ],
      },

      {
        id: 9,
        label: 'Report',
        link: '/app/spinning/report',
        accessible: true,
        icon: null,
        pointerEvent: false,
        children: [
        ],
        level: 2,
      },
    ],
  },
  {
    id: 11,
    label: 'Weaving',
    link: '/app/woven',
    accessible: true,
    pointerEvent: true,
    level: 1,
    children: [
      {
        id: 0,
        label: 'Library',
        link: '/app/woven/library',
        icon: null,
        accessible: true,
        pointerEvent: true,
        level: 2,
      },
      {
        level: 2,
        id: 6,
        label: 'Process',
        link: '/app/woven/mainFunction', // link: '/app/woven/mainFunction',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
        ],
      },
      {
        level: 2,
        id: 5,
        label: 'Operation',
        link: '/app/woven/groupOperationTemplate',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
          {
            level: 3,
            id: 7,
            label: 'Operation Template',
            link: '/app/woven/TemplatePage',
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
          {
            level: 3,
            id: 6,
            label: 'Operation Detail',
            link: '/app/woven/operation',
            // icon: <AppsIcon />,
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
        ],
      },
      {
        level: 2,
        id: 9,
        label: 'Report',
        link: '/app/woven/report',
        accessible: true,
        icon: null,
        pointerEvent: false,
        children: [
        ],
      },
    ],
  },
  {
    level: 1,
    id: 12,
    label: 'Dyeing',
    link: '/app/dyeing',
    accessible: true,
    pointerEvent: true,
    children: [
      {
        id: 0,
        label: 'Master Data',
        link: '/app/dyeing/library',
        icon: null,
        level: 2,
        accessible: true,
        pointerEvent: true,
      },
      {
        id: 6,
        level: 2,
        label: 'Process',
        link: '/app/dyeing/mainFunction',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
        ],
      },
      {
        id: 5,
        level: 2,
        label: 'Operation',
        link: '/app/dyeing/groupOperationTemplate',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
          {
            level: 3,
            id: 7,
            label: 'Operation Template',
            link: '/app/dyeing/TemplatePage', // '/app/dyeing/TemplatePage',
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
          {
            level: 3,
            id: 6,
            label: 'Operation Detail',
            link: '/app/dyeing/operationDetail',
            // icon: <AppsIcon />,
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
        ],
      },
      {
        level: 2,
        id: 9,
        label: 'Report',
        link: '/app/dyeing/report',
        accessible: true,
        icon: null,
        pointerEvent: false,
        children: [
        ],
      },
    ],
  },
  {
    level: 1,
    id: 13,
    label: 'Sewing',
    link: '/app/sewing/',
    accessible: true,
    pointerEvent: true,
    children: [
      {
        level: 2,
        id: 6,
        label: 'Master Data',
        link: '/app/sewing/TemplatePage',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
        ],
      },
      {
        level: 2,
        id: 5,
        label: 'Operation',
        link: '/app/sewing/groupOperationTemplate',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
          {
            level: 3,
            id: 7,
            label: 'Operation Template',
            link: '/app/sewing/TemplatePage', //  '/app/sewing/TemplatePage',
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
          {
            level: 3,
            id: 6,
            label: 'Operation Detail',
            link: '/app/sewing/operationDetail',
            // icon: <AppsIcon />,
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
        ],
      },
      {
        level: 2,
        id: 8,
        label: 'Process',
        link: '/app/sewing/mainFunction',
        accessible: true,
        pointerEvent: false,
        icon: null,
        children: [
        ],
      },
      {
        level: 2,
        id: 9,
        label: 'Report',
        link: '/app/sewing/report',
        accessible: true,
        icon: null,
        pointerEvent: false,
        children: [
        ],
      },
    ],
  },
  {
    id: 14,
    label: 'Washing',
    link: '/app/washing',
    accessible: true,
    level: 1,
    pointerEvent: true,
    children: [
      {
        id: 6,
        label: 'Library',
        link: '/app/washing/library',
        accessible: true,
        pointerEvent: false,
        icon: <MenuBookIcon />,
        level: 2,
        children: [
        ],
      },
      {
        id: 5,
        level: 2,
        label: 'Main Function',
        link: '/app/washing/groupOperationTemplate',
        accessible: true,
        pointerEvent: false,
        icon: <DnsIcon />,
        children: [
          {
            level: 3,
            id: 7,
            label: 'Operation',
            link: '/app/washing/operationDetail', // '/app/washing/TemplatePage',
            accessible: true,
            pointerEvent: true,
            icon: <FolderIcon />,
            children: [
            ],
          },
          {
            level: 3,
            id: 6,
            label: 'Process',
            link: '/app/washing/mainFunction',
            icon: <FolderIcon />,
            accessible: true,
            pointerEvent: true,
            children: [
            ],
          },
        ],
      },
      {
        level: 2,
        id: 8,
        label: 'Permission',
        link: '/app/washing/permission',
        accessible: true,
        pointerEvent: false,
        icon: <ManageAccountsIcon />,
        children: [
        ],
      },
      {
        level: 2,
        id: 9,
        label: 'Report',
        link: '/app/washing/report',
        accessible: true,
        icon: <Report />,
        pointerEvent: false,
        children: [
        ],
      },
    ],
  },
];

const Test: React.FC<any> = () => {
  console.log('test');
  return (
    <div>test</div>
  );
};

export const HeaderIED:React.FC<any> = () => {
  const classes = useStyles();
  const {
    roles: { qcListAccess }, staffDetail,
  } = useSelector((reduxState: any) => reduxState.auth);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { signout } = useAuth();
  const location = useLocation();
  const drawerState = useAppSelector((state: any) => state?.ui);
  const serverName = getLocalStorage('server') === '2' ? 'Live' : 'Test';
  const [profileMenu, setProfileMenu] = useState<any>(null);
  const handleCloseOpenClick = () => {
    // setDrawerState(!drawerState);
    if (drawerState.isOpen) {
      dispatch(setIsClose(false));
    } else {
      dispatch(setIsOpen(true));
    }
  };

  useEffect(() => {
    if (drawerState.isOpen) {
      dispatch(setIsClose(false));
    }
  }, [location, dispatch, drawerState.isOpen]);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Box sx={{
        display: {
          lg: 'none',
          xs: 'block',
        },
      }}
      >
        <Toolbar className={classes.toolbar}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box sx={{
              display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center',
            }}
            >
              <img alt="logo GTAS" src={newLogo} className={classes.headerLogo} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2" className={classes.textTitle}>GTAS IED</Typography>
                <IconBreadcrumbs location={location} />
              </Box>
            </Box>
            <Box className={classes.coverButton}>
              <IconButton onClick={handleCloseOpenClick} edge="end">
                <DensityMediumIcon />
              </IconButton>
            </Box>
          </Box>

        </Toolbar>
      </Box>
      <Box sx={{
        display: {
          lg: 'block',
          xs: 'none',
        },
      }}
      >

        <Toolbar className={classes.toolbar}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box sx={{
              display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center',
            }}
            >
              <img alt="logo GTAS" src={newLogo} className={classes.headerLogo} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2" className={classes.textTitle}>
                  GTAS IED
                  {` (${serverName}) `}
                </Typography>
                <IconBreadcrumbs location={location} />
              </Box>
            </Box>
            <Box>

              {structure
                .filter((item) => item.accessible)
                .map((link) => (
                  <Box className="mainmenu" sx={{ display: 'inline-block' }}>
                    <MenuList item={link} classes={classes} />
                  </Box>
                ))}

              <IconButton
                aria-haspopup="true"
                color="inherit"
                className={classes.headerMenuButton}
                aria-controls="profile-menu"
                onClick={(e) => setProfileMenu(e.currentTarget)}
              >
                <AccountIcon sx={{ color: 'black !important' }} classes={{ root: classes.headerIcon }} />
              </IconButton>

              <Menu
                id="profile-menu"
                open={Boolean(profileMenu)}
                anchorEl={profileMenu}
                onClose={() => setProfileMenu(null)}
                // className={classes.headerMenu}
                classes={{ paper: classes.profileMenu }}
                disableAutoFocusItem={true}
              >
                <div className={classes.profileMenuUser}>
                  <Typography variant="h4">
                    {staffDetail.fullName}
                    {' '}
                    {`(${serverName})`}
                  </Typography>
                </div>
                <MenuItem
                  className={classNames(
                    classes.profileMenuItem,
                    classes.menuItem,
                  )}
                  sx={{ color: 'black !important' }}
                >
                  <AccountIcon className={classes.profileMenuIcon} />
                  {' '}
                  Profile
                </MenuItem>
                <div className={classes.profileMenuUser}>
                  <Typography
                    className={classes.profileMenuLink}
                    color="primary"
                    onClick={() => signout()}
                    sx={{ color: 'rgb(83, 109, 254) !important' }}
                  >
                    Sign Out
                  </Typography>
                </div>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Test;
