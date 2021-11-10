//you may add takeLeading and takeEvery as per the requirements
import { takeLatest, debounce, takeLeading } from "redux-saga/effects";

import * as actions from "../actions";
import { fetchData, postData, patchData, deleteData } from "./genericSagas";

export default function* rootSaga() {
  yield debounce(1500, actions.FETCH_HOMEPAGE_DATA, fetchData);
  yield debounce(1500, actions.FETCH_COUNTRIES, fetchData);
  yield takeLatest(actions.FETCH_SUGGESTED_COURSES, fetchData);

  yield debounce(1500, actions.COURSE_SEARCH, postData);
  yield debounce(1500, actions.FETCH_FILTERS, postData);

  yield takeLatest(actions.USER_LOGIN, postData);
  yield takeLatest(actions.USER_SIGNUP, postData);

  yield takeLatest(actions.FETCH_ADDRESSES, fetchData);

  //profile sagas
  yield takeLatest(actions.FETCH_OTHER_TESTS, fetchData);
  yield takeLatest(actions.FETCH_ENGLISH_TESTS, fetchData);
  yield takeLatest(actions.FETCH_EDUCATION, fetchData);
  yield takeLatest(actions.FETCH_INTERESTS, fetchData);
  yield takeLatest(actions.FETCH_APPLICATIONS, fetchData);
  yield takeLatest(actions.FETCH_MESSAGES, fetchData);

  yield takeLeading(actions.FETCH_ADS, fetchData);
  yield takeLeading(actions.FETCH_BUDGET, fetchData);

  //yield takeLatest(<POSTACTION>, postData);
  //yield takeLatest(<PATCHACTION>, patchData);
  //yield takeLatest(<DELETEACTION>, deleteData);
}
