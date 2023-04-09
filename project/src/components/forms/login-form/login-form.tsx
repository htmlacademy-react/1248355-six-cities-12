import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Login } from '../../../types/app';
import { useAppDispatch } from '../../../hooks/store';
import { authenticateUser } from '../../../store/middlewares/thunk/thunk-actions';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Login>({
    email: '',
    password: ''
  });

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setFormData({ ...formData, [name]: value });

    if (evt.target.validity.patternMismatch) {
      evt.target.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  const onLoginSubmit = (evt: FormEvent<HTMLFormElement>) => {
    (async () => {
      evt.preventDefault();

      const action = await dispatch(authenticateUser(formData));

      if (authenticateUser.rejected.match(action)) {
        toast.error(action.error.message, { toastId: action.error.code });
      }
    })();
  };

  return (
    <form onSubmit={onLoginSubmit} className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="e-mail">E-mail</label>
        <input
          onChange={onInputChange}
          value={formData.email}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          id="e-mail"
          data-testid="e-mail"
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="password">Password</label>
        <input
          pattern="^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)[^\s].+"
          onChange={onInputChange}
          value={formData.password}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          id="password"
          data-testid="password"
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
};

export default LoginForm;
