import { toggleSidebar } from '@/state/features/sidebarSlice';
import { AppDispatch, RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import basisLogo from '/basis_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuildingColumns,
  faChartSimple,
  faChevronCircleLeft,
  faChevronCircleRight,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  // SIDEBAR LINKS
  const sidebarLinks = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: faChartSimple,
    },
    {
      label: 'Users',
      path: '/admin/users',
      icon: faBuildingColumns,
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: faGear,
    },
  ];

  return (
    <aside
      className={`h-[100vh] fixed ${
        isOpen ? 'w-[20vw]' : 'w-[5vw]'
      } bg-gray-100 transition-all ease-in-out duration-300 z-50 flex flex-col gap-6 py-4`}
    >
      <figure
        className={`flex items-center gap-3 justify-between pr-4 ${
          !isOpen && 'flex-col pr-0'
        }`}
      >
        <img
          src={basisLogo}
          className={`${isOpen ? 'w-[50%]' : 'wfull'} h-auto`}
        />
        <FontAwesomeIcon
          icon={isOpen ? faChevronCircleLeft : faChevronCircleRight}
          className="text-lg cursor-pointer text-black hover:scale-[1.02]"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleSidebar(!isOpen));
          }}
        />
      </figure>
      <menu className="flex flex-col gap-2">
        {sidebarLinks.map((link, index) => {
          return (
            <Link
              key={index}
              to={link.path}
              className={`${
                isOpen ? 'justify-start' : 'justify-center'
              } flex items-center gap-3 p-4 px-8 hover:bg-primary hover:text-white transition-all ease-in-out duration-300 w-full`}
            >
              <FontAwesomeIcon icon={link?.icon} />
              <p className={`text-[14px] ${!isOpen && 'hidden'}`}>
                {link?.label}
              </p>
            </Link>
          );
        })}
      </menu>
    </aside>
  );
};

export default Sidebar;
