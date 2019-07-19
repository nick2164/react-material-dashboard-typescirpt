import {ManagerAPIGet} from "./mangerAPI";

export function getPhone(token, phoneNumber) {
  return ManagerAPIGet(`/Phone/` + phoneNumber, {headers: {active,'X-Token': token, contentType: 'application/json'}})

}
