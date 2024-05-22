import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faGear,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // STATE VARIABLES
  const [isOpen, setIsOpen] = useState(false);

  // NAV DROPDOWN
  const dropdownLinks = [
    {
      label: 'Profile',
      path: '/profile',
      icon: faUser,
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: faGear,
    },
    {
      label: 'Logout',
      path: '/auth/logout',
      icon: faArrowRight,
    },
  ];

  return (
    <header className="h-[10vh] flex items-center gap-3 justify-between w-[95%] mx-auto relative">
      <h1 className="text-2xl font-bold w-fit">Basis Forms</h1>
      <Link
        to={'#'}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 bg-transparent"
      >
        <figure className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center p-1 hover:shadow-sm">
          <FontAwesomeIcon icon={faUser} />
        </figure>
      </Link>
      <NavDropdown isOpen={isOpen}>
        <menu className="flex flex-col gap-0 w-[250px] rounded-md shadow-md">
          {dropdownLinks.map((link, index, arr) => {
            return (
              <Link
                key={index}
                to={link.path}
                className={`${index === 0 && 'rounded-t-md'} ${
                  index === arr.length - 1 && 'rounded-b-md'
                } flex items-center gap-3 p-4 hover:bg-primary hover:text-white transition-all ease-in-out duration-300 w-full`}
              >
                <FontAwesomeIcon icon={link?.icon} />
                <p className="text-[14px]">{link?.label}</p>
              </Link>
            );
          })}
        </menu>
      </NavDropdown>
    </header>
  );
};

type NavDropdownTypes = {
  isOpen: boolean;
  children: ReactNode;
};

export const NavDropdown = ({ isOpen, children }: NavDropdownTypes) => {
  return (
    <article
      className={`${
        isOpen ? 'translate-y-0' : 'translate-y-[-350px]'
      } flex flex-col items-start gap-0 absolute top-[10vh] right-0 transition-all ease-in-out duration-300 w-fit z-[1000]`}
    >
      {children}
    </article>
  );
};

export default Navbar;
