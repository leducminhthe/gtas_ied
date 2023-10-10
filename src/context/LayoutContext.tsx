import {
  ThemeProvider,
} from '@mui/material/styles';
import React from 'react';
import Themes from 'themes/index';

const LayoutStateContext:any = React.createContext(null);
const LayoutDispatchContext:any = React.createContext(null);

function layoutReducer(state:any, action:any) {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    case 'TOGGLE_DARKMODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const LayoutProvider:React.FC<{children:any}> = ({ children }):any => {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: false,
    isDarkMode: false,
  });
  const theme = state.isDarkMode ? Themes.dark : Themes.default;
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
};

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider');
  }
  return context;
}

function useLayoutDispatch() {
  const context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider');
  }
  return context;
}

export {
  LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar, toggleDarkMode,
};

// ###########################################################
function toggleSidebar(dispatch:any) {
  dispatch({
    type: 'TOGGLE_SIDEBAR',
  });
}
function toggleDarkMode(dispatch:any, payload:any) {
  dispatch({
    type: 'TOGGLE_DARKMODE',
    payload,
  });
}
