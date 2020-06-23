import {
  UNSHIFT_TRACELOG,
  SET_TRACELOGS,
} from './actions'

const tracelogs = (state = [], action) => {
  switch(action.type){
    case SET_TRACELOGS:
      return [...action.tracelogs]
    case UNSHIFT_TRACELOG:
      const next = [...state]
      next.unshift(action.tracelog)
      return next
    default:
      return state
  }
}

export default tracelogs
