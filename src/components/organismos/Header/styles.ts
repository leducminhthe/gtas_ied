/* eslint-disable max-len */
import { makeStyles } from '@mui/styles';

export default makeStyles((theme:any) => ({
  logotype: (props:any) => ({
    color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
    marginLeft: theme.spacing(2.75),
    marginRight: theme.spacing(2.75),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  }),
  textTitle: {
    color: theme.palette.darkMode.color.main,
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  appBar: () => ({
    width: '100%',
    backgroundColor: `${theme.palette.darkMode.background.default} !important`,
    color: `${theme.palette.darkMode.color.main} !important`,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  headerLogo: {
    width: 175,
    height: 50,
    marginLeft: 3,
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '50px !important',
  },
  hide: {
    display: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuList: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
    paddingLeft: 0,
  },
  headerMenuButtonSandwich: {
    marginLeft: 0,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    justifyContent: 'flex-start',
    padding: 0,
    paddingLeft: 0,
    width: 60,
    height: 50,
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2),

  },
  headerIcon: (props:any) => ({
    // fontSize: 24,
    width: '1.75em !important',
    height: '1.75em !important',
    color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
  }),
  headerIconCollapse: (props:any) => ({
    color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
  }),
  profileMenu: (props:any) => ({
    minWidth: 265,
    backgroundColor: props.toggle ? theme.palette.darkMode.background.light : theme.palette.darkMode.background.dark,
    color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
    boxShadow: 'none',
  }),
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  profileMenuItem: (props) => ({
    color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
  }),
  profileMenuIcon: (props) => ({
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
    '&:hover': {
      color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
    },
  }),
  profileMenuLink: {
    fontSize: 16,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  messageNotification: (props) => ({
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    '&:hover, &:focus': {
      color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
    },
  }),
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
}));
