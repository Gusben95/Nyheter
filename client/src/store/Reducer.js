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
    case 'deleteArticle': 
      let stateCopy = [...state.Articles]

      stateCopy = stateCopy.filter((article)=> {
        return article.id !== action.data;
      })

      return {
        ...state, 
        Articles: stateCopy
      };
    case 'updateArticle':
      let stateCopy2 = [...state.Articles]

      let oldArticleId = stateCopy2.findIndex(object => {
        return object.id === action.data.id;
      })

      stateCopy2[oldArticleId] = action.data

      return {
        ...state,
        Articles: stateCopy2
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