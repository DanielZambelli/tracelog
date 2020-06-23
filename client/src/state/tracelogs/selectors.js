import { createSelector } from 'reselect'
import { getGlobalState } from '../globalState/selectors'
import moment from 'moment'

export const getTracelogs = state => state.tracelogs

export const getTracelogById = createSelector(
  getTracelogs,
  (state, tracelogId) => parseInt(tracelogId),
  (tracelogs, tracelogId) => {
    return tracelogs.find(tracelog => tracelog.id === tracelogId)
  }
)

export const getTracelogCategories = createSelector(
  getTracelogs,
  tracelogs => {
    const categories = []
    for(const log of tracelogs){
      const { cat } = log
      if(cat && !categories.includes(cat))
        categories.push(log.cat)
    }
    return categories
  }
)

export const getFilteredTracelogsCatDate = createSelector(
  getGlobalState,
  getTracelogs,
  (globalState, tracelogs) => {
    const { filterCategory, filterLastDays } = globalState
    if(filterCategory){
      switch(filterCategory){
        case '+':
          tracelogs = tracelogs.filter(log => !!log.cat)
        break
        case '-':
          tracelogs = tracelogs.filter(log => log.cat === null)
        break
        default:
          tracelogs = tracelogs.filter(log => log.cat === filterCategory)
        break
      }
    }
    tracelogs = tracelogs.filter(log => moment().diff(log.createdAt, 'days') <= filterLastDays)
    return tracelogs
  }
)

export const getFilteredTracelogs = createSelector(
  getGlobalState,
  getFilteredTracelogsCatDate,
  (globalState, tracelogs) => {
    const { filterError, filterWarnings, filterMessages } = globalState
    const typesAccepted = []
    if(filterError) typesAccepted.push('error')
    if(filterWarnings) typesAccepted.push('warning')
    if(filterMessages) typesAccepted.push('message')
    return tracelogs.filter(log => typesAccepted.includes(log.type))
  }
)

export const getTracelogCounts = createSelector(
  getFilteredTracelogsCatDate,
  tracelogs => {
    const countErrors = tracelogs.filter(log => log.type === 'error').length
    const countWarnings = tracelogs.filter(log => log.type === 'warning').length
    const countMessages = tracelogs.filter(log => log.type === 'message').length
    return { countErrors, countWarnings, countMessages }
  }
)

