import { ManagerAPIPost } from './mangerAPI';

//export interface GetTokenInterface {
//  token: string
//}

/**
 *
 * @param mainNumber
 * @param username
 * @param password
 */
export function postToken(mainNumber: string, username: string, password: string) {

  return ManagerAPIPost('/token', {
    'X-MainNumber': mainNumber,
    'X-Username': username,
    'X-Password': password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

}
