import { useContext, useEffect } from 'react';
import {
  Navigate,
  useRoutes,
} from 'react-router-dom';

import { ChatPage } from '../pages/chat-page';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register-page';
import { AuthContext } from '../auth/auth-context';
import { AuthRouterWrap } from './auth-router';
import '../css/login-register.css';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <ChatPage /> : <Navigate to="/auth/login" />,
  },
  {
    path: '/auth',
    element: !isLoggedIn ? <AuthRouterWrap /> : <Navigate to="/" />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
];

export const AppRouter = () => {
  const { auth, tokenVerify } = useContext(AuthContext);
  const routing = useRoutes(routes(auth.logged));

  useEffect(() => {
    tokenVerify();
  }, [tokenVerify]);

  return (
    <>
      { routing }
    </>
  );
};
