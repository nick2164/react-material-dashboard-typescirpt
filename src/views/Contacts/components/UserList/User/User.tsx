import React, { useEffect, useState } from 'react';
import './User.css';
import { TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';

interface UserProps {
  user: {
    presence: {
      suggestedIconDescription: string,
      statusName: string,
    },
    userID: number,
    firstName: string,
    lastName: string,
  },
  style: any,
  key: any
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
    <div style={props.style} key={props.key}>
      {
        <TableRow>
          <TableCell key={props.user.userID}>`${props.user.firstName + ' ' + props.user.lastName}`</TableCell>
          <TableCell>`${props.user.presence.statusName}`</TableCell>
        </TableRow>
      }
    </div>
  );

};

export default React.memo(User);
