import React, { useEffect, useState } from 'react';
import './User.css';
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar, ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja, faBaby, faBlind,faFemale,faHiking,faMale,faCrown,faBars } from '@fortawesome/free-solid-svg-icons';

interface UserProps {
  user: {
    presence: {
      suggestedIconDescription: string,
      statusName: string,
    },
    userID: number,
    firstName: string,
    lastName: string,
  }
}

const User = (props: UserProps) => {

  const [color, setColor] = useState('');
  const [icon, setIcon] = useState();

  const icons = [faUserNinja,faBaby, faBlind,faFemale,faHiking,faMale,faCrown];

  useEffect(() => {
    switch (props.user.presence.suggestedIconDescription) {
      case 'available':
        setColor('green');
        break;
      case 'away':
        setColor('yellow');
        break;
      case 'busy':
        setColor('red');
        break;
      case 'working-from-home':
        setColor('blue');
        break;
      default:
        setColor('gray');
        break;
    }
  }, []);

  useEffect(() => {
    setIcon(icons[Math.floor(Math.random() * icons.length)]);

  }, []);


  return (
    <React.Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <FontAwesomeIcon icon={icon}/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.user.firstName + ' ' + props.user.lastName} secondary="Jan 9, 2014"/>
      </ListItem>
      <Divider variant="inset" component={Divider} />
    </React.Fragment>


  );

};

export default React.memo(User);
