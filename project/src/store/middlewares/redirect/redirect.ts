import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { browserHistory } from '../../../utils/browser-history';
import { rootReducer } from '../../index';
import { redirectBack } from './actions';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === redirectBack.type) {
          browserHistory.back();
        }

        return next(action);
      };
