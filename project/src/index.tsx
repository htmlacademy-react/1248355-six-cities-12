import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth } from './store/middlewares/thunk/thunk-actions';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { browserHistory } from './utils/browser-history';
import HistoryRouter from './components/history-router/history-router';
import { MaxElementCountOnScreen } from './consts/enum';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <ToastContainer
        limit={MaxElementCountOnScreen.ToastError}
        position="top-center"
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <App/>
    </HistoryRouter>
  </Provider>
);
