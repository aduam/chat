import { Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register-page';

export const AuthRouter = () => {
  return (
    <>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='*' element={<Navigate to='/auth/login' />} />
    </>
  );
};
