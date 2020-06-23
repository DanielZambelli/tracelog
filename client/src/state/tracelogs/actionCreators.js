import {
  UNSHIFT_TRACELOG,
  SET_TRACELOGS,
} from './actions'

export const setTracelogs = tracelogs => ({ type: SET_TRACELOGS, tracelogs })
export const unshiftTracelog = tracelog => ({ type: UNSHIFT_TRACELOG, tracelog })
