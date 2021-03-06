import React from 'react';
import { Outlet } from 'react-router';
import '../styles/auth.css'

const AuthLayout = () => {
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <div className='flex w-full h-full'>
        <div id='auth' className='w-full h-full  overflow-y-scroll'>
          {/* Layout de Autenticacion */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
