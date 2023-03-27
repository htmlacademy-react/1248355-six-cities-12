import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../../consts/enum';
import { generatePath } from 'react-router-dom';
import { AuthUser } from '../../../types/comments';

const setError = createAction<string | null>('api/setError');

const setLoading = createAction<boolean>('api/setLoading');

const changeAuthStatus = createAction<AuthorizationStatus>('api/changeAuthStatus');

const redirectToRoute = createAction<ReturnType<typeof generatePath>>('api/redirectToRoute');

const setUser = createAction<AuthUser>('api/setUser');

export { redirectToRoute, changeAuthStatus, setLoading, setError, setUser };
