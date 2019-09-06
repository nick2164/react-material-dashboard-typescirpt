import { ManagerAPIGetHook } from './mangerAPI';
import { DependencyList } from 'react';

export interface PhoneInterface {
  forwarding: PhoneForwarding,
  displayName: string,
  phoneNumber: string,
  validUntil: string,
  queueCount: number,
  userID: number,
  voicemailCount: number
}

export interface PhoneForwarding {
  unconditional: PhoneForwardingUnconditional,
  noAnswer: PhoneForwardingNoAnswer,
  busy: PhoneForwardingBusy,
}

export interface PhoneForwardingUnconditional {
  phoneNumber: string
}

export interface PhoneForwardingNoAnswer {
  phoneNumber: string,
  delay: number
}

export interface PhoneForwardingBusy {
  phoneNumber: string
}

export function GetPhones(token: string, dependencies: DependencyList) {

  let isLoading: boolean;
  let fetchedData: PhoneInterface[];

  const request = ManagerAPIGetHook(`/phones`, { headers: { 'X-Token': token } }, dependencies);

  if (!request.isLoading && request.fetchedData !== null) {
    return request.fetchedData;
  } else {
    return [];
  }

}

interface GetPhoneInterface {
  isLoading: boolean,
  fetchedData: PhoneInterface
}

export const GetPhone = (token: string, phoneID: string, dependencies: DependencyList) => {

  let fetchedData: PhoneInterface;

  const request = ManagerAPIGetHook(`/phone/${phoneID}`, { headers: { 'X-Token': token } }, dependencies);

  if (!request.isLoading && request.fetchedData !== null) {
    fetchedData = request.fetchedData;
    return fetchedData;
  } else {
    return {};
  }

};
