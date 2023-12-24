import { Navigate, Outlet } from 'react-router-dom';

import { SideMenu } from '../components';
import { useAuthStore } from '../stores';

export const DashboardLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkStatus);

  if (authStatus === 'pending') {
    checkAuthStatus();
    return <h1>Loading...</h1>;
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to={'/auth/login'} />;
  }

  return (
    <div className='bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white'>
      <div className='flex flex-row relative w-screen'>
        <SideMenu />

        <div className='w-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
