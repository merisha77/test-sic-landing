import { combineReducers } from "redux";

import user from "./userReducers";
import auth from "./authReducers";

export default combineReducers({
  //reducer name here
  user,
  auth,
});
