import { ManagerAPIGetHook } from './mangerAPI';
import { DependencyList } from 'react';

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

// export interface PatchUserPresenceInterface {
//   'statusName': string
// }

// export interface PatchUserInterface {
//   'firstName': string,
//   'lastName': string,
//   'presence': PatchUserPresenceInterface,
// }

// export function get1600FakeUsers(token: string, dependencies: []) {
//
//   let list: GetUserInterface[] = [];
//   const statusName = ['available', 'away', 'busy', 'working-from-home'];
//   const phoneNumbers = ['800', '801', '802', '803'];
//   const userGroupIDs = [201, 605, 140, 10];
//
//   for (let i = 0; i < 1600; i++) {
//
//     let suggestedColor = statusName[Math.floor(Math.random() * statusName.length)];
//
//     list.push(
//       {
//         'presence': {
//           'statusName': suggestedColor,
//           'lastChange': '2005-08-15T15:52:01+00:00',
//           'suggestedIconDescription': suggestedColor,
//           'suggestedColor': 'RED',
//           'lastSeen': '2005-08-15T15:52:01+00:00'
//         },
//         'firstName': loremIpsum({ count: 1, units: 'word' }),
//         'lastName': loremIpsum({ count: 1, units: 'word' }),
//         'email': loremIpsum({ count: 1, units: 'word' }),
//         'phoneNumbers': phoneNumbers,
//         'userID': 0,
//         'userGroups': userGroupIDs
//       }
//     );
//   }
//   return list;
//
// }

export function getUsers(token: string | null, dependencies: DependencyList) {

  let fetchedData: GetUserInterface[];

  const request = ManagerAPIGetHook(`/users`, { headers: { 'X-Token': token } }, dependencies);

  if (!request.isLoading && request.fetchedData !== null) {
    fetchedData = request.fetchedData;
    return fetchedData;
  } else {
    return [];
  }

}

// export function getUser(token: string, userID: number, dependencies: []) {
//
//   let fetchedData: GetUserInterface;
//
//   const request = ManagerAPIGetHook(`/user/${userID}`, { headers: { 'X-Token': token } }, dependencies);
//
//   if (!request.isLoading && request.fetchedData !== null) {
//     fetchedData = request.fetchedData;
//     return fetchedData;
//   } else {
//     return {};
//   }
//
// }

// export function patchUser(token: string, userID: number, data: PatchUserInterface, dependencies: []) {
//
//   let fetchedData: PatchUserInterface;
//
//   const request = ManagerAPIPatchHook(`/user/${userID}`, data, { headers: { 'X-Token': token } }, dependencies);
//
//   return !!(!request.isLoading && request.fetchedData !== null);
//
// }
//
// export function getUserPresence(token: string, userID: number, dependencies: []) {
//
//   let fetchedData: GetUserPresenceInterface;
//
//   const request = ManagerAPIGetHook(`/user/${userID}/presence`, { headers: { 'X-Token': token } }, dependencies);
//
//   if (!request.isLoading && request.fetchedData !== null) {
//     fetchedData = request.fetchedData;
//     return fetchedData;
//   } else {
//     return {};
//   }
// }
//
// export function patchUserPresence(token: string, userID: number, data: PatchUserPresenceInterface, dependencies: []) {
//
//   let fetchedData: PatchUserPresenceInterface;
//
//   const request = ManagerAPIPatchHook(`/user/${userID}/presence`, data, { headers: { 'X-Token': token } }, dependencies);
//
//   return !!(!request.isLoading && request.fetchedData !== null);
// }
