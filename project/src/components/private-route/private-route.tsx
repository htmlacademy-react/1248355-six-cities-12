import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/enum';
import { useAppSelector } from '../../hooks/store';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authorizationStatus = useAppSelector((state) => state.api.authorizationStatus);

  return (
    <Spinner withLoading={false}>
      {authorizationStatus === AuthorizationStatus.Auth
        ? children
        : <Navigate to={AppRoute.Login}/>}
    </Spinner>
  );
};

export default PrivateRoute;
