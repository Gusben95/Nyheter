import { legacy_createStore as createStore } from 'redux'

const init = {
  User: {},
  Articles: [],
}

function dispatchActions(state = init, action) {
  switch(action.type) {
    case 'addArticles': 
      return {
        ...state,
        Articles: action.data
      }
    default: 
      return state
  }
}

const store = createStore(
  dispatchActions,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store