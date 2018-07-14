
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

export default function configureStore(rootReducer, initialState) {
  return compose(applyMiddleware(thunk))(createStore)(rootReducer, initialState);
}

