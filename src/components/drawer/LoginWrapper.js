import React, { useEffect, useState } from "react";
import { Col } from "reactstrap";
import Link from "next/link";
import { Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";

import InputField from "./InputField";

import { userLogin } from "src/actions/authActions";
import { valueChanged, deleteValue } from "src/actions/userActions";
import dynamic from "next/dynamic";
const SocialLogin=dynamic(()=>import("./SocialLogin"));

const LoginWrapper = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const creds = useSelector((state) => state.auth.get("creds"));

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id) data[a.id] = a.value;
      } else isValid = false;
    });
    if (isValid) dispatch(userLogin(data));
  };
  const isLoggedIn = (_) => {
    if (!!creds?.isLoggedIn) return true;
    if (!!window.localStorage.getItem("token")) return true;
    return false;
  };
  const [loc, setLoc] = useState();

  useEffect(() => {
    setLoc(window.location.pathname);
    if (creds?.loginFailed) {
      setLoading(false);
    }
    if (isLoggedIn()) dispatch(deleteValue("activeDrawer"));
  }, [creds]);

  return (
    <Col {...props}>
      <div
        className="login-page position-relative"
        style={{
          zIndex: "1"
        }}
      >
        <div className="text-center">
          <h4 className="mb-4">Login</h4>
        </div>

        <form className="login-form" onSubmit={submitHandler}>
          {!!creds?.loginFailed ? (
            <Alert message={creds?.message} type="error" closable />
          ) : null}
          <InputField
            wrapperClassName={"position-relative"}
            label={
              <>
                Your Email <span className="text-danger">*</span>
              </>
            }
            icon={<i className="mdi mdi-account ml-3 icons"></i>}
            type="email"
            placeholder="Email"
            id="email"
            autoComplete="off"
            required
          />
          <InputField
            wrapperClassName={"position-relative"}
            label={
              <>
                Password <span className="text-danger">*</span>
              </>
            }
            autoComplete="off"
            icon={<i className="mdi mdi-key ml-3 icons"></i>}
            type="password"
            placeholder="Password"
            id="password"
            required
          />

          <Col lg={12}>
            <p className="float-right forgot-pass">
              <Link href="/forget-password">
                <a className="text-dark font-weight-bold">Forgot password?</a>
              </Link>
            </p>
          </Col>

          <Col lg={12} className="mb-0">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              Sign in &nbsp;
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : null}
            </button>
          </Col>

          <Col className="text-center  mt-3">
            <span className="mb-0">
              <small className="text-dark mr-2">Don't have an account ?</small>
              <a
                onClick={() =>
                  loc !== "/login"
                    ? dispatch(
                        valueChanged("activeDrawer", {
                          isVisible: true,
                          drawerKey: "signup",
                          title: "Sign Up"
                        })
                      )
                    : ""
                }
                href={loc === "/login" ? "/signup" : "#!"}
                className="text-dark font-weight-bold pointer"
              >
                <p>Sign Up</p>
              </a>
            </span>
          </Col>
        </form>
        <SocialLogin isLogin />
      </div>
    </Col>
  );
};

export default LoginWrapper;
