import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

import { notification } from "antd";
import { Row, Col } from "reactstrap";

import InputField from "./InputField";

import APIServices from "src/apiUtils/APIServices";
import { valueChanged } from "src/actions/userActions";
import SocialLogin from "./SocialLogin";

const SignUpWrapper = (props) => {
  const history = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState();
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const changeHandler = ({ target: { id, value } }) => {
    if (id === "confirm_password") setShowConfirmMessage(true);
    setFormData({ ...formData, [id]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, success } = await new APIServices("signup/").post(formData);
    if (success) {
      onLoginClick();
      notification.success({ message: data?.message });
    } else {
      notification.error({ message: Object.values(data?.error || {})[0] });
    }
    setLoading(false);
  };

  const onLoginClick = () => {
    window.location.pathname === "/signup"
      ? history.push("/login")
      : dispatch(
          valueChanged("activeDrawer", {
            isVisible: true,
            drawerKey: "login",
            title: "User Login"
          })
        );
  };

  return (
    <Col {...props}>
      <div className="login_page">
        <div className="text-center">
          <h4 className="mb-4">Signup</h4>
        </div>
        <form className="login-form" onSubmit={submitHandler}>
          <Row>
            <InputField
              width={6}
              wrapperClassName={"position-relative"}
              label={
                <>
                  First Name <span className="text-danger">*</span>
                </>
              }
              icon={<i className="mdi mdi-account ml-3 icons"></i>}
              placeholder="First Name"
              id="first_name"
              onChange={changeHandler}
              value={formData?.first_name}
              autoComplete="off"
              required
            />
            <InputField
              width={6}
              wrapperClassName={"position-relative"}
              label={
                <>
                  Last Name <span className="text-danger">*</span>
                </>
              }
              icon={<i className="mdi mdi-account ml-3 icons"></i>}
              placeholder="Last Name"
              id="last_name"
              onChange={changeHandler}
              value={formData?.last_name}
              autoComplete="off"
              required
            />

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
              onChange={changeHandler}
              value={formData?.email}
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
              icon={<i className="mdi mdi-key ml-3 icons"></i>}
              type="password"
              placeholder="Password"
              id="password"
              onChange={changeHandler}
              value={formData?.password}
              autoComplete="off"
              required
            />
            <InputField
              wrapperClassName={"position-relative"}
              label={
                <>
                  Confirm Password
                  <span className="text-danger">*</span>
                </>
              }
              icon={<i className="mdi mdi-key ml-3 icons"></i>}
              type="password"
              placeholder="Confirm Password"
              id="confirm_password"
              autoComplete="off"
              onChange={changeHandler}
              value={formData?.confirm_password}
              required
            >
              {showConfirmMessage &&
              formData?.password !== formData?.confirm_password ? (
                <div class="ant-form-item-explain text-secondary">
                  <div>Password does not matches.</div>
                </div>
              ) : null}
            </InputField>

            <Col md={12}>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    I Accept &nbsp;
                    <Link href="/information/terms">
                      <a className="text-primary">Terms And Condition</a>
                    </Link>
                  </label>
                </div>
              </div>
            </Col>

            <Col md={12}>
              <button
                type="submit"
                disabled={
                  formData?.password !== formData?.confirm_password || loading
                }
                className="btn btn-primary w-100"
              >
                Register &nbsp;
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}
              </button>
            </Col>

            <Col className="text-center  mt-3">
              <span className="mb-0">
                <small className="text-dark mr-2">
                  Already have an account?
                </small>
                <a
                  onClick={onLoginClick}
                  className="text-dark font-weight-bold pointer"
                >
                  <p>Sign In</p>
                </a>
              </span>
            </Col>
          </Row>
        </form>
        <SocialLogin />
      </div>
    </Col>
  );
};

export default SignUpWrapper;
