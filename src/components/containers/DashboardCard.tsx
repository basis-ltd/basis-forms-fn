import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: IconProp;
};

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <figure className="flex items-center gap-6 bg-primary rounded-2xl shadow-md p-4 w-full justify-between transition-all ease-in-out hover:scale-[1.01] cursor-pointer hover:bg-light">
      <section className='flex flex-col gap-2'>
        <h3 className="text-md text-white font-medium">{title}</h3>
        <p className="text-xl font-bold text-white">{value}</p>
      </section>
        <FontAwesomeIcon icon={icon} className='text-white' size='xl' />
    </figure>
  );
};

export default DashboardCard;
