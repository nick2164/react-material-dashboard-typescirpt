import { ManagerAPIGet } from './mangerAPI';

export interface GetPhoneInterface {
  forwarding: GetPhoneForwarding,
  displayName: string,
  phoneNumber: string,
  validUntil: string,
  queueCount: number,
  userID: number,
  voicemailCount: number
}

export interface GetPhoneForwarding {
  unconditional: GetPhoneForwardingUnconditional,
  noAnswer: GetPhoneForwardingNoAnswer,
  busy: GetPhoneForwardingBusy,
}

export interface GetPhoneForwardingUnconditional {
  phoneNumber: string
}

export interface GetPhoneForwardingNoAnswer {
  phoneNumber: string,
  delay: number
}

export interface GetPhoneForwardingBusy {
  phoneNumber: string
}

export interface GetPhonesInterface {
  [index: number]: GetPhoneInterface
}

export function getPhones(token: string, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetPhonesInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/phones`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}

export function getPhone(token: string, phoneID: number, dependencies: []) {

  let isLoading: boolean;
  let fetchedData: GetPhoneInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/phone/${phoneID}`, { headers: { 'X-Token': token } }, dependencies);

  return [isLoading, fetchedData];

}
