import {AuthorizationStatus} from '../../consts/api';
import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../consts/app';

type PrivateRouteProps = {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
  children: JSX.Element;
}

const PrivateRoute = ({children, authorizationStatus}: PrivateRouteProps)=> (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login}/>
);

export default PrivateRoute;
