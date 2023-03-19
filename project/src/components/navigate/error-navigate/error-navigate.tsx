import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../../consts/enum';

const ErrorNavigate = () => (
  <Navigate relative="path" to={AppRoute.Error}/>
);

export default ErrorNavigate;
