import React from 'react';
import SystemMenu from '../partials/SystemMenu';

const Layout = ({ children }) => {
  return (
    <>
      <SystemMenu />
      {children}
    </>
  );
};

export default Layout;
