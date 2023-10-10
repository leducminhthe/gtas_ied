/* eslint-disable react-hooks/rules-of-hooks */
// import SidebarWrapperTemplate from 'components/templates/SidebarWrapperTemplate';
import SidebarWrapperTemplate from 'components/template/SidebarTemplate';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'router/PrivateRoute';
import { flattenRouteArr } from './routeMethod';
import { privateRoutes, publicRoutes } from './routes';

/**
 * Render list of public Routes.
 */
export const renderPublicRoutes = () => publicRoutes.map(({ path, ...rest }, i) => (
  <Route key={path + String(i)} exact={true} path={path} {...rest}>
    <rest.loadComponent />
  </Route>
));

/**
 * Return a PrivateRoutes wrapper with a list of Routes inside.
 * @returns JSX.Element
 */
export const renderPrivateRoutes = () => (
  <PrivateRoute path="/app">
    <SidebarWrapperTemplate>
      <Switch>
        {flattenRouteArr(privateRoutes).map(({
          path, title, hasAppbar = true, ...rest
        }) => (
          <Route key={path} path={`/app${path}`} exact={true} {...rest}>
            <rest.loadComponent />
          </Route>
        ))}

        {/* If not match, redirect to 404 */}
        <Redirect to="/404" />
      </Switch>
    </SidebarWrapperTemplate>
  </PrivateRoute>
);
