import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth } from './store/middlewares/thunk/thunk-actions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { MAX_TOAST_ERRORS } from './consts/app';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        limit={MAX_TOAST_ERRORS}
        position="top-center"
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <App/>
    </Provider>
  </React.StrictMode>
);
