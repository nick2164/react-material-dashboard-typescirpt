import React, { useEffect, useState } from 'react';
import './User.css';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

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

  useEffect(() => {
    switch (props.user.presence.suggestedIconDescription) {
      case 'available':
        setColor('success');
        break;
      case 'away':
        setColor('warning');
        break;
      case 'busy':
        setColor('danger');
        break;
      case 'working-from-home':
        setColor('primary');
        break;
      default:
        setColor('info');
        break;
    }
  }, []);

  return (
    <React.Fragment>
      <ListItem color={color}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.user.firstName + ' ' + props.user.lastName} secondary="Jan 9, 2014"/>
      </ListItem>
      <Divider variant="inset" component={Divider} />
    </React.Fragment>


  );

};

export default React.memo(User);
