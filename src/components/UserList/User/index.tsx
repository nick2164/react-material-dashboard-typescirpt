import React, { useState } from 'react';
import moment from 'moment';
import './User.css';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBaby,
  faBlind,
  faCrown,
  faFemale,
  faHiking,
  faMale,
  faUserAstronaut,
  faUserNinja
} from '@fortawesome/free-solid-svg-icons';
import { GetUserInterface } from 'hooks/managerAPI/users';

interface UserProps {
  user: GetUserInterface
}

const User = (props: UserProps) => {

  const icons = [faUserNinja, faBaby, faBlind, faFemale, faHiking, faMale, faCrown, faUserAstronaut];

  const [icon] = useState(icons[Math.floor(Math.random() * icons.length)]);

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <FontAwesomeIcon icon={icon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.user.firstName + ' ' + props.user.lastName} secondary={moment.utc(props.user.presence.lastSeen).format('LLLL')} />
      </ListItem>
      <Divider variant="inset" component={Divider} />
    </React.Fragment>

  );

};

export default React.memo(User);
