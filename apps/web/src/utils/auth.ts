export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};