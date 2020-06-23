import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { parseState, persistState } from './persist'
import { CLEAR_STATE } from './actions'
import globalState from './globalState/reducer'
import tracelogs from './tracelogs/reducer'

const appReducer = combineReducers({
  globalState,
  tracelogs
})

const rootReducer = (state, action) => {
  if(action.type === CLEAR_STATE)
    state = undefined
  return appReducer(state, action)
}

const composeEnhancers = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enhancers = composeEnhancers( applyMiddleware(thunk) )
const store = createStore(rootReducer, parseState(), enhancers)
store.subscribe(() => persistState(store.getState()))

export default store
