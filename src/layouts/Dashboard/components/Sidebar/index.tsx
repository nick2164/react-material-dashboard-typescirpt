import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// Externals
import classNames from 'classnames';
// Material helpers
// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';
// Material icons
import {
  AccountBoxOutlined as AccountBoxIcon,
  DashboardOutlined as DashboardIcon,
  ImageOutlined as ImageIcon,
  InfoOutlined as InfoIcon,
  LockOpenOutlined as LockOpenIcon,
  PeopleOutlined as PeopleIcon,
  SettingsOutlined as SettingsIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  TextFields as TextFieldsIcon
} from '@material-ui/icons';
// Component styles
import useStyles from './useStyles';

type Props = {
  className?: string;
};

const Sidebar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);

  return (
    <nav className={rootClassName}>
      <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to="/">
          <img
            alt="Brainalytica logo"
            className={classes.logoImage}
            src="/images/logos/brainalytica_logo.svg"
          />
        </Link>
      </div>
      <Divider className={classes.logoDivider}/>
      <div className={classes.profile}>
        <Link to="/account">
          <Avatar
            alt="Roman Kutepov"
            className={classes.avatar}
            src="/images/avatars/avatar_1.png"
          />
        </Link>
        <Typography className={classes.nameText} variant="h6">
          Roman Kutepov
        </Typography>
        <Typography className={classes.bioText} variant="caption">
          Brain Director
        </Typography>
      </div>
      <Divider className={classes.profileDivider}/>
      <List component="div" disablePadding>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard">
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Dashboard"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/users">
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Users"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/products">
          <ListItemIcon className={classes.listItemIcon}>
            <ShoppingBasketIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Products"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/sign-in">
          <ListItemIcon className={classes.listItemIcon}>
            <LockOpenIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Authentication"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/typography">
          <ListItemIcon className={classes.listItemIcon}>
            <TextFieldsIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Typography"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/icons">
          <ListItemIcon className={classes.listItemIcon}>
            <ImageIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Icons and Images"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/account">
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Account"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/settings">
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Settings"
          />
        </ListItem>
      </List>
      <Divider className={classes.listDivider}/>
      <List
        component="div"
        disablePadding
        subheader={
          <ListSubheader className={classes.listSubheader}>
            Support
          </ListSubheader>
        }>
        <ListItem
          className={classes.listItem}
          component="a"
          href="https://devias.io/contact-us"
          target="_blank">
          <ListItemIcon className={classes.listItemIcon}>
            <InfoIcon/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Customer support"
          />
        </ListItem>
      </List>
    </nav>
  );
};
export default Sidebar;
