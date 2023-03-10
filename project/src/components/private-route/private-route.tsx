import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/enum';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

const PrivateRoute = ({ children, authorizationStatus }: PrivateRouteProps) => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login}/>
);

export default PrivateRoute;
