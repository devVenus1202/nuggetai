import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { i18nState } from 'redux-i18n';
import reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [logger, sagaMiddleware, thunk, routeMiddleware];

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
    i18nState,
  }),
  compose(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export { store, history };
