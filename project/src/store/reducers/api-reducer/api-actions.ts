import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../consts/enum';
import { AuthUser } from '../../../types/comments';

const setError = createAction<string | null>('api/setError');

const setLoading = createAction<boolean>('api/setLoading');

const changeAuthStatus = createAction<AuthorizationStatus>('api/changeAuthStatus');

const redirectBack = createAction('api/redirectBack');

const setUser = createAction<AuthUser>('api/setUser');

export { redirectBack, changeAuthStatus, setLoading, setError, setUser };
