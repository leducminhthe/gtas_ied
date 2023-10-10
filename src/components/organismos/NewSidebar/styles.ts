import { makeStyles } from '@mui/styles';

const drawerWidth = 255;

const useStyles = makeStyles((theme: any) => ({
  linkText: () => ({
    padding: '0 10px',
    color: theme.palette.text.default,
    // ? theme.palette.darkMode.color.light
    // : theme.palette.darkMode.color.dark,
    transition: theme.transitions.create(['opacity', 'color']),
    fontSize: 16,
    height: '50px',
    lineHeight: '50px',
    textAlign: 'start',
    whiteSpace: 'nowrap',
    letterSpacing: '1px',
    marginLeft: '10px',
  }),
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.12)',
    background: theme.palette.grey['900'],
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#E5E5E5',
    },
    '&::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: '#E5E5E5',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
      backgroundColor: '#606060',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: `${theme.palette.darkMode.background.main}`,
    color: `${theme.palette.darkMode.color.main}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: `${theme.palette.darkMode.background.main}`,
    color: `${theme.palette.darkMode.color.main}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: theme.spacing(7) + 40,
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
    },
    width: '60px', // 50px
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    padding: '0 0.6rem',
    background: '#2a2185',
    display: 'flex',
    // justifyContent: 'space-between',
    marginRight: '10px',
    alignItems: 'center',
  },
  iconButton: {
    color: '#D93E46',
    position: 'relative',
    padding: '0',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
  iconButtonOpen: {
    left: '-5px',
  },
  iconButtonClose: {
    left: '-150px',
  },
  list: {
    // background: theme.palette.grey['900'],
  },
  listItem: {
    '&.Mui-selected': {
      background: theme.palette.primary.main,
    },
    '&.Mui-selected[class*="collapseItem"]': {
      background: theme.palette.secondary.light,
      '&.has-children': {
        background: theme.palette.grey['300'],
      },
    },
  },
  listItemText: {
    paddingLeft: '10px',
  },
  listItemTextChild: {
    paddingLeft: '25px',
  },
  listItemNoPadding: {
    padding: '0px',
  },
  collapseList: {
    background: theme.palette.grey['300'],
    color: 'black',
  },
  collapseItem: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.grey['900']}`,
    },
    '& > a': {
      width: '100%',
    },
  },
  collapseItemText: {
    marginLeft: '1rem',
  },
  logoutButton: {
    background: 'white',
    color: theme.palette.primary.main,
  },
  anchorStyle: {
    color: 'white',
    textDecoration: 'none !important',
  },
}));

export default useStyles;
