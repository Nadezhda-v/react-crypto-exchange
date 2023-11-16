export const setToken = (token) => {
  localStorage.setItem('bearer', token);
};

export const getToken = () => {
  let token = '';

  if (localStorage.getItem('bearer')) {
    token = localStorage.getItem('bearer');
    setToken(token);
  }

  return token;
};

export const delToken = () => {
  if (localStorage.getItem('bearer')) {
    localStorage.removeItem('bearer');
  }
};
