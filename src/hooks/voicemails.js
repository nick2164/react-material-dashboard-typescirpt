import {ManagerAPIGet} from "./mangerAPI";

export function getVoicemailBoxes(token) {
  return ManagerAPIGet(`/voicemailBoxes`, {headers: {'X-Token': token, contentType: 'application/json'}})
}

export function getVoicemailFolder(token,voicemailBox, voicemailFolder) {
  return ManagerAPIGet(`/voicemailBox/${voicemailBox}/${voicemailFolder}`,  {headers: {'X-Token': token, contentType: 'application/json'}})
}

export function getVoicemailWAV(token,voicemailBox, voicemailFolder, voicemailID) {
  return ManagerAPIGet(`/voicemailBox/${voicemailBox}/${voicemailFolder}/${voicemailID}`,  {headers: {'X-Token': token, contentType: 'application/json'}})
}
