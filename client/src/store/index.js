import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import app from "./app/reducer";

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  app,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
