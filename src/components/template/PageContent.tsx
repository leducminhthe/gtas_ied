/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-constant-condition */
/* eslint-disable import/export */
/* eslint-disable no-undef */
import {
  AppBar,
  Box, Button, Collapse, Drawer, Fab, Hidden, IconButton, Input, Paper, styled, Toolbar, Typography,
} from '@mui/material';
import React from 'react';
import PillButton from 'components/atoms/Buttons/PillButton';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const drawerWidth = 380;
const headerHeight = 200;

const useStyles = makeStyles((theme:any) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
    position: 'relative',
    flex: '1 1 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
    marginTop: '0.5rem',
  },
  contentCardWrapper: {
    position: 'relative',
    padding: 0,
    // maxWidth: 1400,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    width: '100%',
    minWidth: '0',
    maxHeight: '100%',
    margin: '0 auto',
    // [theme.breakpoints.down('sm')]: {
    //   padding: 16,
    // },
    // [theme.breakpoints.down('xs')]: {
    //   padding: 12,
    // },
  },
  contentCard: {
    display: 'flex',
    position: 'relative',
    flex: '1 1 100%',
    flexDirection: 'row',
    // backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    borderRadius: 8,
    minHeight: 0,
    overflow: 'hidden',
  },
  drawerPaper: {
    width: drawerWidth,
    maxWidth: '100%',
    overflow: 'hidden',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  drawerOpen: {
    width: drawerWidth,
    // backgroundColor: `${theme.palette.darkMode.background.main}`,
    // color: `${theme.palette.darkMode.color.main}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    // backgroundColor: `${theme.palette.darkMode.background.main}`,
    // color: `${theme.palette.darkMode.color.main}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    // width: theme.spacing(7) + 40,
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
    },
    width: '0px', // 50px
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%',
    zIndex: 10,
    background: theme.palette.background.paper,
  },
  content: {
    display: 'flex',
    flex: '1 1 100%',
    minHeight: 0,
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
    marginRight: 0,
  },
  textTitle: {
    color: theme.palette.darkMode.color.main,
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  headerIcon: (props:any) => ({
    // fontSize: 24,
    width: '1.75em !important',
    height: '1.75em !important',
    color: props.toggle ? theme.palette.darkMode.color.light : theme.palette.darkMode.color.dark,
  }),
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: '50px !important',
  },
  absolute: {
    position: 'absolute',
    left: 0,
  },
  addButton: {
    position: 'fixed',
    right: 20,
    bottom: 30,
    zIndex: 99,
  },
}));

interface PageContentProps{
    contentLeft: JSX.Element,
    contentRight: JSX.Element,
}
export const PaperCustome = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px solid #eae6eb',
  // marginBottom: '0.75rem',
  //   borderRadius: '0.75rem',
  //   boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '0rem',
  boxShadow: 'none',
  background: 'white',
  marginTop: '0.5rem',
}));
const PageContent:React.FC<PageContentProps> = ({ contentLeft, contentRight }) => {
  console.log('test');
  const classes = useStyles(false);
  const [toggle, setToggle] = React.useState(true);
  console.log('toggle', toggle);
  const handleChange = () => {
    const stateShow = !toggle;
    setToggle(stateShow);
  };
  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={handleChange}
            className={classes.headerMenuButtonCollapse}
          >
            <ManageSearchIcon classes={{
              root: clsx(
                classes.headerIcon,
              ),
            }}
            />
          </IconButton>
          <Typography variant="h2" className={classes.textTitle}>Process Management</Typography>
        </Box>
        <PillButton
          type="button"
          variant="contained"
          fullWidth={false}
          style={{
            // borderRadius: 0, borderTopRightRadius: '0.25rem',
            minWidth: '80px',
            minHeight: '37px',
            margin: '-4px 0px 0px 7px',
          }}
          onClick={(event) => {
            // handleClickOption(event);
            // setDialogAddIsopen(true);
          }}
        >
          <span style={{ display: 'flex', justifyContent: 'flex-end' }}><AddIcon /></span>
          {' '}
          Add
        </PillButton>
      </Box> */}
      {/* <PaperCustome sx={{
        display: 'flex',
        height: 'calc(86vh)',
        maxHeight: 'calc(86vh)',
      }}
      >
        <Collapse
          orientation="horizontal"
          in={toggle}
          style={{
            width: '300px', zIndex: '99',
          }}
        >
          <div style={{ minWidth: '300px' }}>
            {contentLeft}
          </div>
        </Collapse>

        <div style={{ flexGrow: 1 }}>content</div>

      </PaperCustome> */}
      <div className={clsx(classes.root)}>

        <div className={clsx(classes.contentCardWrapper, 'container')}>

          <div className={classes.contentCard}>

            <Box sx={{
              display: {
                lg: 'none',
                xs: 'block',
              },
            }}>
              <Drawer
                // className="h-full absolute z-20"
                variant="temporary"
                anchor="left"
                sx={{
                  height: '100%',
                  zIndex: 20,
                }}
                open={toggle}
                onClose={() => {
                  console.log('close');
                  handleChange();
                }}
                classes={{
                  paper: clsx(classes.drawerPaper, classes.absolute, {
                    [classes.drawerOpen]: toggle,
                    [classes.drawerClose]: !toggle,
                  }),
                }}
                className={clsx({
                  [classes.drawerOpen]: toggle,
                  [classes.drawerClose]: !toggle,
                })}
                style={{ position: 'absolute', left: 0 }}
                ModalProps={{
                  keepMounted: true,
                  disablePortal: true,
                  BackdropProps: {
                    classes: {
                      root: classes.absolute,
                    },
                  },
                }}
              >
                {contentLeft}
              </Drawer>
            </Box>
            <Box sx={{
              display: {
                lg: 'block',
                xs: 'none',
              },
            }}>
              <Drawer
                className="h-full z-20"
                sx={{
                  height: '100%',
                  zIndex: 20,
                }}
                variant="permanent"
                // open={toggle}
                classes={{
                  paper: clsx({
                    [classes.drawerPaper]: true,
                    [classes.drawerOpen]: toggle,
                    [classes.drawerClose]: !toggle,
                  }),
                }}
              >
                {contentLeft}
              </Drawer>
            </Box>

            <main className={clsx(classes.contentWrapper, 'z-10')}>
              <>
                <AppBar className="w-full" position="static" elevation={1}>
                  <Toolbar className="px-16" classes={{ root: classes.toolbar }}>
                    {/* <IconButton
                          color="inherit"
                          aria-label="Open drawer"
                          onClick={() => dispatch(Actions.openMobileChatsSidebar())}
                          className="flex md:hidden"
                        >
                          <Icon>chat</Icon>
                        </IconButton> */}
                    <Box sx={{ display: 'flex', gap: '0.7rem' }}
                            // onClick={() => dispatch(Actions.openContactSidebar())}
                        >
                      <Box className="relative ml-8 mr-12" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Box
                          className="absolute right-0 bottom-0 -m-4 z-10"
                          onClick={() => {
                            handleChange();
                          }}
                          sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                          }}>
                          <ViewListIcon />
                        </Box>
                      </Box>
                      <Typography color="inherit" variant="button" display="block" gutterBottom={false}>test</Typography>
                    </Box>
                  </Toolbar>
                </AppBar>

                <div className={classes.content}>
                  {/* <Chat className="flex flex-1 z-10" /> */}
                  {contentRight}
                </div>
              </>
            </main>
          </div>
        </div>
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.addButton}
          // onClick={() => dispatch(Actions.openNewEventDialog({
          //   start: new Date(),
          //   end: new Date(),
          // }))}
                >
          <AddCircleOutlineOutlinedIcon />
        </Fab>
      </div>
    </Box>
  );
};

export default PageContent;
