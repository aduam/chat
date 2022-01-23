import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { ChatPage } from '../pages/chat-page';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register-page';
import '../css/login-register.css';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/auth' element={<AuthRouterWrap />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>
          <Route path='/chat' element={<ChatPage />} />
          <Route path='*' element={<Navigate to='/auth/login' />} />
        </Routes>
      </div>
    </Router>
  );
};

const AuthRouterWrap = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
