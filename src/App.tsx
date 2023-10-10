import { CircularProgress } from '@mui/material';
import useValidateToken from 'hooks/useValidateToken';
import Page403 from 'pages/error/Page403';
import Page404 from 'pages/error/Page404';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { renderPrivateRoutes, renderPublicRoutes } from './router/routeElements';

const App: React.FC = () => {
  const { isTokenChecked } = useValidateToken();
  // prevent router redirect by return plain html
  if (!isTokenChecked) {
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <div style={{
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <CircularProgress size={30} />
        </div>
      </div>
    );
  }
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/:url*(/+)"
            exact={true}
            strict={true}
            render={({ location }) => (
              <Redirect to={location.pathname.replace(/\/+$/, '')} />
            )}
          />

          <Route path="/403">
            <Page403 />
          </Route>

          <Route path="/404">
            <Page404 />
          </Route>
          {renderPublicRoutes()}
          {renderPrivateRoutes()}
          <Route
            path=""
            render={({ location }) => (
              <Redirect to="/login" />
            )}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
