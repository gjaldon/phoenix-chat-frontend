import { combineReducers } from "redux"

function user(state = {
  email: "",
  username: "",
  id: "",
  public_key: "",
  website: ""
}, action) {
  switch (action.type) {
    case "USER_NEW":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        username: action.payload.user.username,
        id: action.payload.user.id
      })
    case "USER_LOGIN":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        username: action.payload.user.username,
        id: action.payload.user.id
      })
    case "USER_AUTH":
      return Object.assign({}, state, {
        email: action.payload.user.email,
        username: action.payload.user.username,
        id: action.payload.user.id,
        public_key: action.payload.user.public_key,
        website: action.payload.user.website
      })
    default: return state
  }
}

const reducers = combineReducers({
  user
})

export default reducers
