import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";

import rootSaga from "src/sagas";
import rootReducer from "src/reducers";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = (initialStore) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialStore,
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, {
  debug: false
});

export const localStore = (array, { value }) => {
  let type = array.includes(value) ? "remove" : "add";
  type = !!value ? type : "";
  switch (type) {
    case "add":
      return [...array, value];
    case "remove":
      return array.filter((v) => v !== value);
    default:
      return [];
  }
};
