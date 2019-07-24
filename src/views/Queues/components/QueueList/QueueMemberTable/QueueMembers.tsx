import { GetQueueMemberInterface } from '../../../../../hooks/managerAPI/queues';
import QueueMember, { queueMemberInterface } from './hooks/QueueMember';

const QueueMembers = (queueMembers: GetQueueMemberInterface[]) => {

  let returnData:queueMemberInterface[] = [];

  queueMembers.map(queueMember => {
    returnData.push(QueueMember(queueMember))
  });

  return returnData;

};

export default QueueMembers;