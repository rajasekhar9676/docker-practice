import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const buyerToken = localStorage.getItem('buyerToken');
      const farmerToken = localStorage.getItem('token');

      let url = '';
      let config = {};

      if (buyerToken) {
        url = `${BASE_URL}/api/buyers/profile`;
        config.headers = { Authorization: `Bearer ${buyerToken}` };
      } else if (farmerToken) {
        url = `${BASE_URL}/api/users/profile`;
        config.headers = { Authorization: `Bearer ${farmerToken}` };
      } else {
        setUser(null);
        return;
      }

      const res = await axios.get(url, config);
      setUser(res.data);
    } catch (err) {
      console.error('Auth fetch error:', err.message);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
