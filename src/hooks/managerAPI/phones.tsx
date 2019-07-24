import { ManagerAPIGet } from './mangerAPI';

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

export interface PhonesInterface {
  [index: number]: PhoneInterface
}

interface GetPhonesInterface {
  isLoading: boolean,
  fetchedData: PhonesInterface
}

export function GetPhones(token: string, dependencies: []): GetPhonesInterface {

  let isLoading: boolean;
  let fetchedData: PhonesInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/phones`, { headers: { 'X-Token': token } }, dependencies);

  return {isLoading, fetchedData};

}

interface GetPhoneInterface {
  isLoading: boolean,
  fetchedData: PhoneInterface
}

export const GetPhone = (token: string, phoneID: string, dependencies: []): GetPhoneInterface => {

  let isLoading: boolean;
  let fetchedData: PhoneInterface;

  [isLoading, fetchedData] = ManagerAPIGet(`/phone/${phoneID}`, { headers: { 'X-Token': token } }, dependencies);

  return {isLoading,fetchedData};

};
