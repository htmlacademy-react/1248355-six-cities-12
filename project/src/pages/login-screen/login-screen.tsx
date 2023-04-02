import { Helmet } from 'react-helmet-async';
import LoginForm from '../../components/form/login/login-form';
import { AppRoute, AuthorizationStatus, City } from '../../consts/enum';
import { getRandomArrayElement } from '../../utils/common';
import { generatePath, Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import Spinner from '../../components/spinner/spinner';
import { getUserStatus } from '../../store/reducers/user-slice/selectors';

const LoginScreen = () => {
  const authorizationStatus = useAppSelector(getUserStatus);
  const randomCity = getRandomArrayElement(Object.values(City));

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={generatePath(AppRoute.City, { city: City.Paris })}/>;
  }

  return (
    <Spinner isActive={authorizationStatus === AuthorizationStatus.Unknown}>
      <main className="page__main page__main--login">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={generatePath(AppRoute.City, { city: randomCity })}>
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Spinner>
  );
};

export default LoginScreen;
