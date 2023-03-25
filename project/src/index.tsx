import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { comments } from './mocks/commets';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth } from './store/thunk-actions';
import { setLoading } from './store/reducers/api-reducer/api-actions';

store.dispatch(setLoading(true));
store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App comments={comments}/>
    </Provider>
  </React.StrictMode>
);
