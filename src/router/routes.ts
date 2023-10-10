import React, { lazy } from 'react';
import { PrivateRouteType } from 'types/authType';
import Login from 'pages/login/index';

// import DetailReport from 'pages/Report/ReportDetailComponent';
/**
 * Login is not required
 * Note: sub-routes is not supported
 */
const Library = React.lazy(() => import('pages/home'));
// const Home = React.lazy(() => import('pages/home'));
// const Login = React.lazy(() => import('pages/login'));

export const publicRoutes = [
  {
    path: '/login',
    title: 'Login',
    loadComponent: Login,
  },
];

/**
 * Login required
 */
export const privateRoutes: PrivateRouteType[] = [
  {
    path: '',
    title: '',
    loadComponent: Library,
    hasNotSidebar: true,
  },
];
