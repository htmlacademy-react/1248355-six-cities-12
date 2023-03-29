import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/enum';
import { useAppSelector } from '../../hooks/store';
import Spinner from '../spinner/spinner';
import { getUserStatus } from '../../store/reducers/user-slice/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authorizationStatus = useAppSelector(getUserStatus);

  return (
    <Spinner isActive={authorizationStatus === AuthorizationStatus.Unknown}>
      {authorizationStatus === AuthorizationStatus.Auth
        ? children
        : <Navigate to={AppRoute.Login}/>}
    </Spinner>
  );
};

export default PrivateRoute;
