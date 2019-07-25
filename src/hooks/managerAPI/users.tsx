import { ManagerAPIGet, ManagerAPIPatch } from './mangerAPI';
import { loremIpsum } from 'lorem-ipsum';

export interface GetUserPresenceInterface {
  'statusName': string,
  'lastChange': string,
  'suggestedIconDescription': string,
  'suggestedColor': string,
  'lastSeen': string
}

export interface GetUserInterface {
  'presence': GetUserPresenceInterface,
  'firstName': string,
  'lastName': string,
  'email': string,
  'phoneNumbers': string[],
  'userID': number
  'userGroups': number[]
}

export interface PatchUserPresenceInterface {
  'statusName': string
}

export interface PatchUserInterface {
  'firstName': string,
  'lastName': string,
  'presence': PatchUserPresenceInterface,
}

export interface UsersInterface {
  [index: number]: GetUserInterface
}

export function get1600FakeUsers(token: string, dependencies: []) {

  let list: GetUserInterface[] = [];
  const statusName = ['available', 'away', 'busy', 'working-from-home'];
  const phoneNumbers = ['800', '801', '802', '803'];
  const userGroupIDs = [201, 605, 140, 10];

  for (let i = 0; i < 1600; i++) {

    let suggestedColor = statusName[Math.floor(Math.random() * statusName.length)];

    list.push(
      {
        'presence': {
          'statusName': suggestedColor,
          'lastChange': '2005-08-15T15:52:01+00:00',
          'suggestedIconDescription': suggestedColor,
          'suggestedColor': 'RED',
          'lastSeen': '2005-08-15T15:52:01+00:00'
        },
        'firstName': loremIpsum({ count: 1, units: 'word' }),
        'lastName': loremIpsum({ count: 1, units: 'word' }),
        'email': loremIpsum({ count: 1, units: 'word' }),
        'phoneNumbers': phoneNumbers,
        'userID': 0,
        'userGroups': userGroupIDs
      }
    );
  }
  return list;

}

export function getUsers(token: string, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: UsersInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/users`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getUser(token: string, userID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetUserInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/user/${userID}`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function patchUser(token: string, userID: number, data: PatchUserInterface, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: PatchUserInterface;

  [isLoading, fetchedData] = ManagerAPIPatch(`/user/${userID}`, data, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getUserPresence(token: string, userID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetUserPresenceInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/user/${userID}/presence`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];
}

export function patchUserPresence(token: string, userID: number, data: PatchUserPresenceInterface, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: PatchUserPresenceInterface;

  [isLoading, fetchedData] = ManagerAPIPatch(`/user/${userID}/presence`, data, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];
}