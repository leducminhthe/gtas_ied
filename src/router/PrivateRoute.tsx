import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route, RouteProps, Redirect,
} from 'react-router-dom';
// import { Store } from 'redux/store';
// import { Store } from 'redux/store';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state: any) => state.auth);
  return (
    <Route
      {...rest}
      render={(innerProps) => {
        const loginPath = '/login';
        // eslint-disable-next-line no-constant-condition
        return (isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: loginPath,
              state: { from: innerProps.location },
            }}
          />
        ));
      }}
    />
  );
};

export default PrivateRoute;
