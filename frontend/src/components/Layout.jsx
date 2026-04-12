import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ role }) {
  return (
    <div className="layout">
      <Sidebar role={role} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
