import { legacy_createStore as createStore } from 'redux'

const init = {
  User: {
    id: Number,
    name: String,
    email: String,
    stillPaying: Boolean,
    subscriptionEnd: String,
    preference: [
      "", ""
    ]
  },
  Articles: [
    {
      title: String,
      shortDescription: String,
      mainText: String,
      categorys: String,
      author: Number,
      dateAdded: String,
      views: String,
      images: [
        "", ""
      ]
    },
  ],
  Message: ""
}

function dispatchActions(state = init, action) {
  switch(action.type) {
    case 'setMessage': 
      return {
        ...state,
        Message: action.text
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