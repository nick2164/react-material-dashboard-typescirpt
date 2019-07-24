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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faUsers, faVoicemail } from '@fortawesome/free-solid-svg-icons';

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
            alt="evercall"
            className={classes.logoImage}
            src="/images/logos/evercall.svg"
          />
        </Link>
      </div>
      <Divider className={classes.logoDivider}/>
      <List component="div" disablePadding>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/contacts">
          <ListItemIcon className={classes.listItemIcon}>
            <FontAwesomeIcon icon={faAddressBook}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Kontakter"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/groups">
          <ListItemIcon className={classes.listItemIcon}>
            <FontAwesomeIcon icon={faUsers}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Grupper"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/voicemails">
          <ListItemIcon className={classes.listItemIcon}>
            <FontAwesomeIcon icon={faVoicemail}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Telefonsvarer"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/queues">
          <ListItemIcon className={classes.listItemIcon}>
            <FontAwesomeIcon icon={faUsers}/>
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Køer"
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
