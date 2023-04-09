import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '../types/store';
import { DeepPartial } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../consts/enum';
import MainScreen from '../pages/main-screen/main-screen';
import { Action } from 'redux';

const mockStore = configureMockStore<RootState>()({});
const history = createMemoryHistory();

type TestWrapperProps = {
  children: ReactNode;
  fakeStore?: typeof mockStore;
  fakeHistory?: typeof history;
}

type RoutesWrapperProps = {
  jsxElement: JSX.Element;
  path: string;
  isMain?: boolean;
}

const ProviderWrapper = ({ children, fakeStore, fakeHistory }: TestWrapperProps) => {
  const store = configureMockStore<RootState>()({});
  const brHistory = createMemoryHistory();

  return (
    <Provider store={fakeStore || store}>
      <HistoryRouter history={fakeHistory || brHistory}>
        <HelmetProvider>
          {children}
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
};

const RoutesWrapper = ({ path, jsxElement, isMain = true }: RoutesWrapperProps) => (
  <Routes>
    <Route path={AppRoute.Root} element={<div><Outlet/></div>}>
      {isMain
        ?
        <Route
          index
          element={
            <MainScreen/>
          }
        />
        :
        <Route
          index
          element={
            <div>main page</div>
          }
        />}
      <Route
        path={path}
        element={
          jsxElement
        }
      />
      <Route
        path='*'
        element={
          <div>not found</div>
        }
      />
    </Route>
  </Routes>
);

const getPromiseHelper = () => {
  let resolve: (value: unknown) => void = () => undefined;

  const promise = new Promise((res) => {
    resolve = res;
  });

  return { resolve, promise };
};

const createMockStoreWithAPI = (fakeState: DeepPartial<RootState>) => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action<string>>
  >(middlewares)(fakeState);

  return { fakeStore, mockAPI };
};

export { ProviderWrapper, createMockStoreWithAPI, RoutesWrapper, getPromiseHelper };
