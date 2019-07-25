import { ManagerAPIGet } from './mangerAPI';
import { loremIpsum, LoremIpsum } from 'lorem-ipsum';

export interface GetQueuesInterface {
  [index: number]: GetQueueInterface,
}

export interface GetQueueInterface {
  description: string,
  members: GetQueueMemberInterface[],
  calls: {
    callerCount: number,
    averageHoldTime: number,
    longestHoldTime: number,
    totalTalkTime: number,
  },
  settings: {
    ringTime: number,
    timeout: number,
  },
  queueID: number
}

export interface GetQueueMemberInterface {
  status: {
    device: string,
    callConfirm: boolean,
    callsTaken: number,
    priority: number,
    paused: boolean
  },
  phoneNumber: string
}

export interface GetQueueMembersInterface {
  [index: number]: GetQueueMemberInterface
}

export function get160FakeQueues(token: string, dependencies: []) {

  let list: GetQueueInterface[] = [];

  for (let i = 0; i < 160; i++) {

    list.push(
      {
        description: loremIpsum({ count: 2, units: 'word'}),
        members: getFakeQueueMembers('', 0, []),
        calls: {
          callerCount: 41,
          averageHoldTime: 10,
          longestHoldTime: 50,
          totalTalkTime: 4100
        },
        settings: {
          ringTime: 45,
          timeout: 200
        },
        queueID: 201
      }
    );
  }
  return list;

}

export function getFakeQueueMembers(token: string, queueID: number, dependencies: []) {

  let list: GetQueueMemberInterface[] = [];

  const statusName = ['RINGING', 'UNKNOWN', 'BUSY', 'AVAILABLE'];

  for (let i = 0; i < 200; i++) {

    list.push(
      {
        status: {
          device: statusName[Math.floor(Math.random() * statusName.length)],
          callConfirm: false,
          priority: (Math.floor(Math.random() * 8) + 1),
          callsTaken: (Math.floor(Math.random() * 50) + 1),
          paused: Math.random() >= 0.5
        },
        phoneNumber: (Math.floor(Math.random() * 99999999) + 1000000).toString()
      }
    );
  }
  return list;

}


export function getQueues(token: string, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetQueuesInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/queues`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getQueue(token: string, queueID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetQueueInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/queue/${queueID}`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getQueueMembers(token: string, queueID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetQueueInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/queue/${queueID}/members`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getQueueMember(token: string, queueID: number, queueMember: string, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetQueueInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/queue/${queueID}/member/${queueMember}`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}
