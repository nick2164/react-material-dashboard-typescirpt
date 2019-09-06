import React, { useState } from 'react';
// Externals
import classNames from 'classnames';
// Material helpers
// Material components
import { Drawer, useMediaQuery, useTheme } from '@material-ui/core';
// Custom components
import { Footer, Sidebar, Topbar } from './components';

import useStyles from './useStyles';

type Props = {
  title: string;
};

const Dashboard: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = useState(!isMobile);

  const shiftTopbar = isOpen && !isMobile;
  const shiftContent = isOpen && !isMobile;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };
  return (
    <>
      <Topbar
        className={classNames(classes.topbar, {
          [classes.topbarShift]: shiftTopbar
        })}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        title={title}
      />
      <Drawer

        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={isOpen}
        variant={isMobile ? 'temporary' : 'persistent'}>
        <Sidebar className={classes.sidebar}/>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: shiftContent
        })}>
        {children}
        <Footer/>
      </main>
    </>
  );
};

export default Dashboard;
