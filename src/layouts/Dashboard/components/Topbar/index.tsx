import React, { Fragment, useContext } from 'react';
// Externals
import classNames from 'classnames';
// Material helpers
// Material components
import { IconButton, Toolbar, Typography } from '@material-ui/core';
// Material icons
import { Close as CloseIcon, Input as InputIcon, Menu as MenuIcon } from '@material-ui/icons';
// Component styles
import useStyles from './useStyles';
import { __RouterContext } from 'react-router';

type Props = {
  title: string;
  className: string;
  isSidebarOpen: boolean;
  onToggleSidebar: Function;
};

const Topbar: React.FC<Props> = ({
                                   className,
                                   title,
                                   isSidebarOpen,
                                   onToggleSidebar
                                 }) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  const { history } = useContext(__RouterContext);

  const handleSignOut = () => {
    localStorage.setItem('token', 'null');
    history.push('/sign-in');
  };

  return (
    <Fragment>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={() => onToggleSidebar()}
            // variant="text"
          >
            {isSidebarOpen ? <CloseIcon/> : <MenuIcon/>}
          </IconButton>
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          <IconButton className={classes.signOutButton} onClick={handleSignOut}>
            <InputIcon/>
          </IconButton>
        </Toolbar>
      </div>
    </Fragment>
  );
};

export default Topbar;
