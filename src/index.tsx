import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';
import reportWebVitals from 'reportWebVitals';

import { CssBaseline } from '@mui/material';
// import { SnackbarProvider } from 'notistack';
import { ToastContainer } from 'react-toastify';
import { StyledEngineProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { LayoutProvider } from 'context/LayoutContext';
import { store } from 'store';

const MainComponent: React.FC = () => (
  <Provider store={store}>
    <StyledEngineProvider injectFirst={true}>
      <LayoutProvider>
        <ToastContainer
          position="top-right"
          theme="colored"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
        />
        <CssBaseline />
        <App />
      </LayoutProvider>
    </StyledEngineProvider>
  </Provider>
);
ReactDOM.render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
