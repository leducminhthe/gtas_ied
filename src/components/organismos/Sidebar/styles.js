import { makeStyles } from '@mui/styles';

const drawerWidth = 255;

export default makeStyles((theme) => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: (props) => ({
    width: drawerWidth,
    backgroundColor: `${theme.palette.darkMode.background.main}`,
    color: `${theme.palette.darkMode.color.main}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawerClose: (props) => ({
    backgroundColor: `${theme.palette.darkMode.background.main}`,
    color: `${theme.palette.darkMode.color.main}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: theme.spacing(7) + 40,
    width: 0,
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
    },
  }),
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: 18,
    [theme.breakpoints.only('sm')]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0.625),
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(0.625),
      display: 'initial',
    },
  },
}));
