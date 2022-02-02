import { createContext, useCallback, useState } from 'react';

import { fetchWithoutToken, fetchWithToken } from '../helpers';

export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (email, password) => {
    const res = await fetchWithoutToken('login', { email, password }, 'POST');
    if (res.ok) {
      const user = res.body.user;
      localStorage.setItem('token', res.body.token);
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }
    return res.ok;
  };
  const register = async (name, email, password) => {
    const res = await fetchWithoutToken('login/new', { name, email, password }, 'POST');
    if (res.ok) {
      const user = res.user;
      localStorage.setItem('token', res.token);
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    }
    return res.ok;
  };

  const tokenVerify = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }
    const res = await fetchWithToken('login/refresh');
    const user = res.user;
    if (res.ok) {
      localStorage.setItem('token', res.token);
      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
      return false;
    }
    return true;
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider value={{
      login,
      register,
      tokenVerify,
      logout,
      auth,
    }}>
      { children }
    </AuthContext.Provider>
  );
};
