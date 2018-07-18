
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}) {
  return compose(applyMiddleware(thunk))(createStore)(rootReducer, initialState);
//   const debug =
//       __DEV__ && __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION__
//         ? window.__REDUX_DEVTOOLS_EXTENSION__()
//         : f => f;

//   if (initialState) {
//     return createStore(
//       rootReducer,
//       initialState,
//       compose(applyMiddleware(thunk), debug)
//     );
//   }
//   return createStore(
//     rootReducer,
//     compose(applyMiddleware(thunk), debug)
//   );
}

