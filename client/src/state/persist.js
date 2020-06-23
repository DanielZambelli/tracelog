const key = 'tracelog_store_state'

export const persistState = (state) => {
  try{
    localStorage.setItem(key, JSON.stringify(state))
  }catch(e){}
}

export const parseState = (state) => {
  try{
    let stateParsed = JSON.parse(localStorage.getItem(key))
    return stateParsed === null ? undefined : stateParsed
  }catch(e){}
}
