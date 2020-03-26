import { createStore, applyMiddleware } from 'redux';
import { persistStore } from "redux-persist";
import logger from 'redux-logger';

import rootReducer from "./root-reducer";

const middlewares = [];
// To display only when the environment is Development
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };