import DashboardCard from '@/components/containers/DashboardCard';
import DashboardChart from '@/components/containers/DashboardChart';
import Select from '@/components/inputs/Select';
import { monthsData } from '@/constants/dashboard';
import {
  faDatabase,
  faDiagramProject,
  faRectangleList,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DashboardUsersList from './DashboardUsersList';
import DashboardFormsList from './DashboardFormsList';

const AdminDashboard = () => {
  // STATE VARIABLES
  const [monthsDataArray, setMonthsDataArray] = useState(monthsData());
  const [selectedMetric, setSelectedMetric] = useState('entries');

  // DASHBOARD CARDS DEFINITION
  const dashboardCards = [
    { icon: faDiagramProject, title: 'Active Projects', value: 100 },
    { icon: faRectangleList, title: 'Active Forms', value: 100 },
    { icon: faUsers, title: 'Active Users', value: 100 },
    { icon: faDatabase, title: 'Weekly Enties', value: 100 },
  ];

  // DASHBOARD METIRCS OPTIONS
  const metricsOptions = [
    { label: 'Projects', value: 'projects' },
    { label: 'Forms', value: 'forms' },
    { label: 'Users', value: 'users' },
    { label: 'Entries', value: 'entries' },
  ];

  return (
    <main className="flex flex-col gap-6 w-full py-6">
      <menu className="flex items-center gap-3 justify-between">
        {dashboardCards.map((card, index) => {
          return (
            <DashboardCard
              icon={card.icon}
              title={card.title}
              value={card.value}
              key={index}
            />
          );
        })}
      </menu>
      <menu className="flex items-start gap-3 w-full my-4">
        <section className="dashboard-chart flex flex-col gap-4 min-w-[75%] h-[50vh]">
          <menu className="flex items-center justify-between">
            <h2 className="text-lg text-primary font-semibold uppercase">
              {
                metricsOptions?.find(
                  (metric) => metric?.value === selectedMetric
                )?.label
              }{' '}
              overview
            </h2>
            <label className="w-fit">
              <Select
                value={selectedMetric}
                onChange={(e) => {
                  setSelectedMetric(e);
                  setMonthsDataArray(monthsData());
                }}
                placeholder="Select metric"
                options={metricsOptions}
              />
            </label>
          </menu>
          <DashboardChart data={monthsDataArray} dataKey="month" />
        </section>
        <section className="w-full h-[50vh] shadow-xs rounded-md">
          <h1 className="px-2 uppercase text-lg text-primary font-semibold">
            Recently added users
          </h1>
          <DashboardUsersList />
        </section>
      </menu>
      <section className="flex flex-col gap-3 w-full">
        <h1 className="text-lg text-primary font-semibold uppercase">
          Recent forms
        </h1>
        <DashboardFormsList />
      </section>
    </main>
  );
};

export default AdminDashboard;
