import { ManagerAPIGetHook, ManagerAPIPatchHook } from './mangerAPI';
import { loremIpsum } from 'lorem-ipsum';
import { DependencyList } from 'react';

export interface GetUserGroupInterface {
  'userGroupDescription': string,
  'userGroupName': string,
  'userGroupID': string,
  'users': number[],
}

export function getUserGroups(token: string, dependencies: DependencyList) {

  let fetchedData: GetUserGroupInterface[];

  const request = ManagerAPIGetHook(`/userGroups`, { headers: { 'X-Token': token } }, dependencies);

  if (!request.isLoading && request.fetchedData !== null) {
    fetchedData = request.fetchedData;
    return fetchedData;
  } else {
    return [];
  }

}

export function getUserGroup(token: string, userGroupID: number, dependencies: DependencyList) {

  let fetchedData: GetUserGroupInterface;

  const request = ManagerAPIGetHook(`/userGroup/${userGroupID}`, { headers: { 'X-Token': token } }, dependencies);

  if (!request.isLoading && request.fetchedData !== null) {
    fetchedData = request.fetchedData;
    return fetchedData;
  } else {
    return {};
  }

}
