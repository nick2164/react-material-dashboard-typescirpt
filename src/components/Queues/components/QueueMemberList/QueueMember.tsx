import { GetQueueMemberInterface } from 'hooks/managerAPI/queues';
import { loremIpsum } from 'lorem-ipsum';
import {
  faEraser,
  faHeadset,
  faMugHot,
  faQuestion, faThumbsDown,
  faThumbsUp,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, Props as FontAwesomeProps } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface QueueMemberReturnInterface {
  phoneNumber: string,
  name: string,
  status: string,
  callsTaken: number,
  statusIcon: JSX.Element
}

interface QueueMemberInterface {
  queueMember: GetQueueMemberInterface
}

const QueueMember = (props: GetQueueMemberInterface): QueueMemberReturnInterface => {

  let returnData: QueueMemberReturnInterface = {
    callsTaken: props.status.callsTaken,
    name: '',
    phoneNumber: props.phoneNumber,
    status: '',
    statusIcon: <FontAwesomeIcon icon={faQuestion}/>
  };

  switch (props.status.device) {
    case 'RINGING':
      returnData.status = 'Ringer';
      returnData.statusIcon = <FontAwesomeIcon icon={faHeadset} size={'2x'}/>;
      break;
    default:
    case 'UNKNOWN':
      returnData.status = 'Uvidst';
      returnData.statusIcon = <FontAwesomeIcon icon={faQuestion} size={'2x'}/>;
      break;
    case 'BUSY':
      returnData.status = 'Optaget';
      returnData.statusIcon = <FontAwesomeIcon icon={faThumbsDown} size={'2x'}/>;
      break;
    case 'AVAILABLE':
      returnData.status = 'Ledig';
      returnData.statusIcon = <FontAwesomeIcon icon={faThumbsUp} size={'2x'}/>;
      break;
  }
  if(props.status.paused) {
    returnData.status = 'Pause';
    returnData.statusIcon = <FontAwesomeIcon icon={faMugHot} size={'2x'}/>
  }

  returnData.name = loremIpsum({units: 'word', count: Math.floor(Math.random()*3) + 2});

  return returnData;
};

export default QueueMember;