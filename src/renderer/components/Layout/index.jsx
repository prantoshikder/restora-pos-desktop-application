import React from 'react';

const styles = {
  mainContent: {
    paddingTop: '1.9rem',
  },
};

const Layout = ({ children }) => {
  return <div className={styles.mainContent}>{children}</div>;
};

export default Layout;
