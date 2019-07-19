import {ManagerAPIPost} from "./mangerAPI";

export class authentication {
  static postToken(mainNumber, username, password) {

    return ManagerAPIPost(`/token`, {
      'X-MainNumber': mainNumber,
      'X-Username': username,
      'X-Password': password
    }, {headers: {contentType: 'application/json'}});

  }
}
