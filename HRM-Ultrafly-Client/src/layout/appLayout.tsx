import './styles.css';

import React, {  useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header';
import { SideBar } from './side-nav';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow" style={{background:'#E5E7EB'}}>
          <Outlet />
        </main>

      </div>
    </div>
  );
};
