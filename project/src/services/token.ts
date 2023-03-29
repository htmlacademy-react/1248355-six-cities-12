const AUTH_TOKEN_KEY_NAME = 'app-data-loading-status-slice-token';

const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';

const setToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};
const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export { getToken, setToken, removeToken };
