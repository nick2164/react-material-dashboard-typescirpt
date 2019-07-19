import { ManagerAPIGet } from './mangerAPI';
import { loremIpsum } from 'lorem-ipsum';

interface User {
  'presence': {
    'statusName': string,
    'lastChange': string,
    'suggestedIconDescription': string,
    'suggestedColor': string,
    'lastSeen': string
  },
  'firstName': string,
  'lastName': string,
  'email': string,
  'phoneCount': number,
  'userID': number
}

export function get1600FakeUsers(token: string, dependencies: []) {

  let list: User[] = [];
  const statusName = ['available', 'away', 'busy', 'working-from-home'];

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
        'phoneCount': 0,
        'userID': 0
      }
    );
  }
  return [false, list];

}

export function getUsers(token: string, dependencies: []) {

  return ManagerAPIGet(`/users`, { headers: { 'X-Token': token } }, dependencies);
}

export function getUser(token: string, userID: number, dependencies: []) {

  return ManagerAPIGet(`/user/${userID}`, { headers: { 'X-Token': token } }, dependencies);
}

export function getUserPhones(token: string, userID: number, dependencies: []) {

  return ManagerAPIGet(`/user/${userID}/phones`, { headers: { 'X-Token': token } }, dependencies);
}
