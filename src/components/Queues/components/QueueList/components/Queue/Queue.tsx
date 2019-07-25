import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTaxi } from '@fortawesome/free-solid-svg-icons';
import { GetQueueInterface } from '../../../../../../hooks/managerAPI/queues';

interface UserProps {
  queue: GetQueueInterface,
  selectQueueHandler: (queue: GetQueueInterface) => void
}

const Queue = (props: UserProps) => {

  return (
    <div>
      <ListItem button onClick={() => props.selectQueueHandler(props.queue)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={faTaxi}/>
        </ListItemIcon>
        <ListItemText primary={props.queue.description}/>
      </ListItem>
    </div>
  );

};

export default React.memo(Queue);
