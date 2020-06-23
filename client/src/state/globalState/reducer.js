import { SET_GLOBAL_STATE } from './actions'

const INIT_STATE = {
  secret: '',
  filterLastDays: 30,
  filterCategory: '',
  filterError: true,
  filterWarnings: true,
  filterMessages: true,
}

const globalViewState = (state = INIT_STATE, action) => {
  switch(action.type){
    case SET_GLOBAL_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default globalViewState
