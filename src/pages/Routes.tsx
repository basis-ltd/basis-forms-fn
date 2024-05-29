import { Routes as Router, Route, useLocation } from 'react-router';
import Login from './auth/Login';
import AdminDashboard from './dashboard/AdminDashboard';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import ListUsers from './users/ListUsers';
import ListInstitutions from './institutions/ListInstitutions';
import { useEffect, useState } from 'react';

const Routes = () => {
  // STATE VARIABLES
  const { isOpen: sidebarOpen } = useSelector(
    (state: RootState) => state.sidebar
  );
  const [hideNavigation, setHideNavigation] = useState(false);

  // NAVIGATION
  const { pathname } = useLocation();

  useEffect(() => {
    const fullPageRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/forgot-password',
      '/auth/reset-password',
    ];

    if (fullPageRoutes.includes(pathname)) {
      setHideNavigation(true);
    } else {
      setHideNavigation(false);
    }
  }, [pathname]);

  return (
    <main className="w-[100vw] h-full relative">
      {
      hideNavigation ? null : <Sidebar />}
      <main
        className={`${
          sidebarOpen ? 'w-[80vw] left-[20vw]' : 'w-[95vw] left-[5vw]'
        } ${hideNavigation && '!left-0 !w-[100vw] !p-0'} absolute transition-all ease-in-out duration-300 p-2 flex flex-col gap-2`}
      >
        {hideNavigation ? null : <Navbar />}
        <section className={`${hideNavigation && '!top-0 w-full !ml-0'} absolute top-[10vh] w-[95%] ml-[2.5%]`}>
          <Router>
            <Route path="/auth/login" element={<Login />} />
            {/* PROTECTED ROUTES */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ListUsers />} />
            <Route path="/admin/institutions" element={<ListInstitutions />} />
          </Router>
        </section>
      </main>
    </main>
  );
};

export default Routes;
