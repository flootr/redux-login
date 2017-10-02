import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import userReducer from './user'

const reducers = combineReducers({
  user: userReducer
})

export default function initStore () {
  const store = createStore(reducers, applyMiddleware(thunkMiddleware))

  if (process.env.NODE_ENV === 'development' && window !== undefined) {
    window.store = store
  }

  return store
}
