import { Routes as Router, Route } from 'react-router';
import Login from './auth/Login';
import SuperAdminDashboard from './dashboard/SuperAdminDashboard';

const Routes = () => {
  return (
    <Router>
      <Route path="/auth/login" element={<Login />} />
      {/* PROTECTED ROUTES */}
      <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
    </Router>
  );
};

export default Routes;
