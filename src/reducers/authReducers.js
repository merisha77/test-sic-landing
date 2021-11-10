import { fromJS } from "immutable";

import {
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  AUTH_VALUE_CHANGED,
  AUTH_DELETE_VALUE
} from "src/actions";

const initialState = fromJS({});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_VALUE_CHANGED:
      return state.setIn(
        [...action.payload.field.split(".")],
        action.payload.value
      );

    case AUTH_DELETE_VALUE:
      return state.deleteIn([...action.payload.field.split(".")]);

    case USER_LOGIN_SUCCEEDED:
      const { access, user_data } = action?.data;
      window.localStorage.setItem("user", JSON.stringify(user_data));
      return state.set("creds", { isLoggedIn: true, access, user_data });

    case USER_LOGIN_FAILED:
      return state.set("creds", {
        loginFailed: true,
        message:
          action?.error?.data?.error?.non_field_errors || "Could not login."
      });

    case USER_LOGOUT:
      return state.delete("creds");

    default:
      return state;
  }
};

export default authReducer;
