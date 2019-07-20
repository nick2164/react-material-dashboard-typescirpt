import { ManagerAPIGet, ManagerAPIPatch } from './mangerAPI';
import { loremIpsum } from 'lorem-ipsum';

export interface GetUserGroupInterface {
  'userGroupDescription': string,
  'userGroupName': string,
  'userGroupID': string,
  'users': number[],
}

export interface UserGroupsInterface {
  [index: number]: GetUserGroupInterface
}

export function getUserGroups(token: string, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: UserGroupsInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/userGroups`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getUserGroup(token: string, userGroupID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetUserGroupInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/userGroup/${userGroupID}`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}
