import { Routes as Router, Route } from 'react-router';
import Login from './auth/Login';
import SuperAdminDashboard from './dashboard/SuperAdminDashboard';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import ListUsers from './users/ListUsers';
import ListInstitutions from './institutions/ListInstitutions';

const Routes = () => {
  // STATE VARIABLES
  const { isOpen: sidebarOpen } = useSelector(
    (state: RootState) => state.sidebar
  );

  return (
    <main className="w-[100vw] h-full relative">
      <Sidebar />
      <main
        className={`${
          sidebarOpen ? 'w-[80vw] left-[20vw]' : 'w-[95vw] left-[5vw]'
        } absolute transition-all ease-in-out duration-300 p-2 flex flex-col gap-2`}
      >
        <Navbar />
        <section className="absolute top-[10vh] w-[95%] ml-[2.5%]">
          <Router>
            <Route path="/auth/login" element={<Login />} />
            {/* PROTECTED ROUTES */}
            <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/admin/users" element={<ListUsers />} />
            <Route path="/admin/institutions" element={<ListInstitutions />} />
          </Router>
        </section>
      </main>
    </main>
  );
};

export default Routes;
