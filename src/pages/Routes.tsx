import { Routes as Router, Route } from 'react-router';
import Login from './auth/Login';

const Routes = () => {
  return (
    <Router>
      <Route path="/auth/login" element={<Login />} />
    </Router>
  );
};

export default Routes;
