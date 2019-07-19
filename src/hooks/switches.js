import {ManagerAPIGet, ManagerAPIPatch} from './mangerAPI';

export function getSwitches(token,dependencies) {

  return ManagerAPIGet(`/switches`, {headers: {'X-Token': token}},dependencies)
}

export function getSwitch(token, switchID) {
  return ManagerAPIGet(`/switch/` + switchID, {headers: {'X-Token': token}})
}

export function patchSwitch(token, switchID, active) {
  return ManagerAPIPatch(`/switch/` + switchID, {active}, {
    headers: {
      'X-Token': token
    }
  })
}
