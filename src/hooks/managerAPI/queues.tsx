import { ManagerAPIGet } from './mangerAPI';
import { loremIpsum } from 'lorem-ipsum';
import { GetUserInterface } from './users';

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
  const descriptions = ['Kø Alle', 'Space Invaders', 'Mødregruppen', 'For alle os der kan!'];

  const member: GetQueueMemberInterface = {
    status: {
      device: 'available',
      callConfirm: false,
      priority: 0,
      callsTaken: 8,
      paused: false
    },
    phoneNumber: '81110608'
  };

  for (let i = 0; i < 160; i++) {

    let description = descriptions[Math.floor(Math.random() * descriptions.length)];

    list.push(
      {
        description: description,
        members: [member],
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
  return [list];

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
