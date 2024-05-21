import { MouseEventHandler, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

type ButtonTypes = {
  to?: To;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  primary?: boolean;
  submit?: boolean;
};

const Button = ({
  to = '#',
  children,
  className,
  onClick,
  primary = false,
  submit,
}: ButtonTypes) => {
  if (submit) {
    return (
      <button
        type="submit"
        className={`transition-all text-center flex items-center justify-center duration-100 p-2 px-4 border border-primary hover:bg-primary hover:text-white hover:scale-[.99] rounded-md shadow-sm ${
          primary && 'bg-primary text-white hover:scale-[.9995]'
        } ${className}`}
        onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`transition-all text-center flex items-center justify-center duration-100 p-2 px-4 border border-primary hover:bg-primary hover:text-white hover:scale-[.99] rounded-md shadow-sm ${
        primary && 'bg-primary text-white hover:scale-[.9995]'
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Button;
