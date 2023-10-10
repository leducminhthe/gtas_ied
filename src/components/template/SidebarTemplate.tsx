/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { Box } from '@mui/material';
import background from 'assets/images/vai3.jpg';
import clsx from 'clsx';
import useStyles from 'components/organismos/Layout/styles';
// import LoadingPage from 'components/organismos/ScreenLoader/LoadingPage';
// import Sidebar from 'components/organismos/Sidebar/Sidebar.js';
import { useLayoutState } from 'context/LayoutContext';
import React, { Suspense, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import NewSidebar from 'components/organismos/NewSidebar';
import { useAppSelector } from 'store/hooks';
import { HeaderIED } from 'components/organismos/Header';

import { RootState } from 'store';
import { privateRoutes } from 'router/routes';
import LoadingPage from 'components/organismos/ScreenLoader/LoadingPage';
/**
 * Sidebar on the left.
 * All pages are rendered on the right.
 * Used in PrivateRoute.
 */
const matches = window.innerWidth < 1367;
const matchesBelowLaptop = window.innerWidth < 1500;
const SidebarWrapperTemplate: React.FC = ({ children }) => {
  // console.log('children', children);
  const location = useLocation();
  const history = useHistory();

  const layoutState: any = useLayoutState();
  const classes = useStyles({ toggle: layoutState.isDarkMode });
  // const renderBackground = !!(location && location.pathname && ((location.pathname.indexOf('library') > 0) || (location.pathname.indexOf('adminDashboard') > 0)));
  const handleGetTitle = useMemo(() => {
    const currentRoute = privateRoutes.find((item: any) => location.pathname.includes(item.path));
    return (currentRoute as any)?.title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const pageWithoutSidebar = privateRoutes
    .filter((route) => route.hasNotSidebar)
    .map((r: { path: any; }) => r.path); // url of page
  if (pageWithoutSidebar.includes(location.pathname.replace('/app', ''))) {
    return (
      <Box
        style={{
          position: 'relative',
          background: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: '90vh',
          margin: '85px 0px 0px 0px',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      >
        <Box sx={{ zIndex: 9 }}>
          <HeaderIED />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      style={{
        position: 'relative',
      }}
    >
      <Box display="flex" className={matchesBelowLaptop ? classes.cssContentBelowLaptop : ''}>
        <NewSidebar location={location} />
        <div
          className={clsx(
            classes.content,
            {
              [classes.contentShift]: layoutState.isSidebarOpened,
              [classes.contentBackground]: layoutState.isDarkMode,
            },
            matches && classes.overrideHeight,
          )}
        >
          <HeaderIED title={handleGetTitle} />
          <div className={classes.fakeToolbar} style={{ minHeight: '40px' }} />
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </div>
      </Box>
    </Box>
  );
};

export default SidebarWrapperTemplate;
