import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './auth';
import uiReducer from './ui';

const createReducer = (asyncReducers:any) => combineReducers({
  auth: authReducer,
  ui: uiReducer,
  ...asyncReducers,
});

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: createReducer(null),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = typeof store.getState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

(store as any).asyncReducers = {};

export const injectReducer = (key:any, reducer:any) => {
  if ((store as any).asyncReducers[key]) {
    return;
  }
  (store as any).asyncReducers[key] = reducer;
  store.replaceReducer(createReducer((store as any).asyncReducers));
  // eslint-disable-next-line consistent-return
  return store;
};

export default store;
