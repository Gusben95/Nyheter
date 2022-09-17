import { legacy_createStore as createStore } from 'redux'

const init = {
  User: {},
  Articles: [],
}

function dispatchActions(state = init, action) {
  switch(action.type) {
    case 'setArticles': 
      return {
        ...state,
        Articles: action.data
      }
    case 'addArticle':
      return {
        ...state,
        Articles: [...state.Articles, action.data]
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
    case 'incrementViewCount':
      let stateCopy3 = [...state.Articles]

      let oldArticleId2 = stateCopy3.findIndex(object => {
        return object.id === action.data;
      })

      stateCopy3[oldArticleId2].views++

      return {
        ...state,
        Articles: stateCopy3
      }

    case 'setUser':
      return {
        ...state,
        User: action.data
      }
    case 'updateUser':
      return {
        ...state,
        User: action.data
      }
    case 'logout':
      return {
        ...state,
        User: {}
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