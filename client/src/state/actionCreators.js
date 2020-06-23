import { CLEAR_STATE } from './actions'
import { setGlobalState } from './globalState/actionCreators'
import { setTracelogs } from './tracelogs/actionCreators'

export * from './globalState/actionCreators'
export * from './tracelogs/actionCreators'
export const clearState = () => ({ type: CLEAR_STATE })

const API = process.env.REACT_APP_API

const { Base64 } = require('js-base64')

export const authenticate = (secret) => (dispatch) => {
  return fetch(`${API}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: Base64.encode(secret) })
  })
    .then(res => res.json())
    .then(payload => dispatch(setGlobalState({ token: payload.token })))
    .catch(() => dispatch(setGlobalState({ token: null })))
}

export const fetchLogs = () => (dispatch, getState) => {
  return fetch(`${API}/api/logs`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${getState().globalState.token}` },
  })
    .then(res => res.json())
    .then(tracelogs => dispatch(setTracelogs(tracelogs)))
}


 // when new tracelogs are added the backend will pushed
  // these via socket io to the frontend client
  // TODO: action creator
  // subscribeToPostLog(secret){
  //   const { unshiftTracelog } = this.props
  //   const { socket } = window
  //   if(socket){
  //     // TODO: just pass _siid value
  //     socket.emit('JOIN_TRACELOG_ROOM', { secret })
  //     socket.on('POST_LOG', unshiftTracelog)
  //   }
  // }
