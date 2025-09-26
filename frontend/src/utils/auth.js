import Cookies from 'js-cookie';

export const setAuthData = (token, user) => {
  Cookies.set('token', token, { expires: 7 }); // 7 days
  Cookies.set('user', JSON.stringify(user), { expires: 7 });
};

export const getAuthData = () => {
  const token = Cookies.get('token');
  const userStr = Cookies.get('user');
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
};

export const clearAuthData = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};

export const isAuthenticated = () => {
  const { token } = getAuthData();
  return !!token;
};

export const isAdmin = () => {
  const { user } = getAuthData();
  return user?.role === 'admin';
};