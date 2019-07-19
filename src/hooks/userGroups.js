import {ManagerAPIGet} from "./mangerAPI";
import {loremIpsum} from "lorem-ipsum";

export function getUserGroups(token,dependencies) {

  return ManagerAPIGet(`/userGroups`, {headers: {'X-Token': token}},dependencies)
}

export function getUserGroup(token,userGroupID,dependencies) {

  return ManagerAPIGet(`/usergroup/${userGroupID}`, {headers: {'X-Token': token}},dependencies)
}
