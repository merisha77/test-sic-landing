import {
  USER_LOGIN,
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
  USER_SIGNUP,
  USER_SIGNUP_SUCCEEDED,
  USER_SIGNUP_FAILED,
  USER_LOGOUT,
  AUTH_VALUE_CHANGED,
  AUTH_DELETE_VALUE,
} from "./index";

export const valueChanged = (field, value) => ({
  type: AUTH_VALUE_CHANGED,
  payload: { field, value },
});

export const deleteValue = (field) => ({
  type: AUTH_DELETE_VALUE,
  payload: { field },
});

export const userLogin = (data = {}) => {
  return {
    type: USER_LOGIN,
    payload: {
      data,
      url: "client-sign-in/",
      onSuccess: USER_LOGIN_SUCCEEDED,
      onFailure: USER_LOGIN_FAILED,
    },
  };
};

export const userSignup = (data = {}) => {
  return {
    type: USER_SIGNUP,
    payload: {
      data,
      url: "/signup/",
      onSuccess: USER_SIGNUP_SUCCEEDED,
      onFailure: USER_SIGNUP_FAILED,
    },
  };
};

export const logoutUser = (_) => ({
  type: USER_LOGOUT,
});
