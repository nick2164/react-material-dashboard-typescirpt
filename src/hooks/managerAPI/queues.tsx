import { ManagerAPIGet } from './mangerAPI';
import { loremIpsum } from 'lorem-ipsum';

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

export const queuePlaceholder:GetQueueInterface = {
  description: '',
  queueID: 0,
  calls: {
    averageHoldTime: 0,
    callerCount: 0,
    longestHoldTime: 0,
    totalTalkTime: 0
  },
  members: [],
  settings: {
    ringTime: 0,
    timeout: 0
  }
};


export function get160FakeQueues(token: string, dependencies: []) {

  let list: GetQueueInterface[] = [];

  for (let i = 0; i < 2; i++) {

    list.push(
      {
        description: loremIpsum({ count: 2, units: 'word' }),
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

  for (let i = 0; i < 2000; i++) {

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
  let fetchedData: GetQueueInterface[];

  [isLoading, fetchedData] = ManagerAPIGet(`/queues`, { headers: { 'X-Token': token } }, dependencies);

  if (!isLoading && fetchedData !== null) {
    return fetchedData;
  } else {
    return [];
  }

}

export function getQueue(token: string, queueID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetQueueInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/queue/${queueID}`, { headers: { 'X-Token': token } }, dependencies);

  if (!isLoading && fetchedData !== null) {
    return fetchedData;
  } else {
    return fetchedData;
  }

}

export function getQueueMembers(token: string, queueID: number, dependencies: [any]) {

  let isLoading: boolean;
  let fetchedData: GetQueueMemberInterface[];

  [isLoading, fetchedData] = ManagerAPIGet(`/queue/${queueID}/members`, { headers: { 'X-Token': token } }, dependencies);

  if (!isLoading && fetchedData !== null) {
    return fetchedData;
  } else {
    return [];
  }
}

export function getQueueMember(token: string, queueID: number, queueMember: string, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetQueueInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/queue/${queueID}/member/${queueMember}`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}
