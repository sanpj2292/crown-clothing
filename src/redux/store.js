import { createStore, applyMiddleware } from 'redux';
import { persistStore } from "redux-persist";
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-sagas";

import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// To display only when the environment is Development
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };