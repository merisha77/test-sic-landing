import { notification } from "antd";
import APIServices from "src/apiUtils/APIServices";
import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const RecoveryPassword = (_) => {
  const [formData, setFormData] = useState();
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = ({ target: { id, value } }) => {
    if (id === "confirm_password") setShowConfirmMessage(true);
    setFormData({ ...formData, [id]: value });
  };

  const history = useRouter();

  useEffect(() => {
    setFormData({
      ...formData,
      token: new URLSearchParams(window.location.search).get("token")
    });

    validateToken(new URLSearchParams(window.location.search).get("token"));
  }, []);

  const validateToken = async (token) => {
    const { success } = await new APIServices("validate-token/").post({
      token
    });
    if (!success) {
      notification.error({ message: "Invalid token provided." });
      history.push("/forget-password");
    }
  };

  const submit = async (_) => {
    setLoading(true);
    const { data, success } = await new APIServices(
      "rest-password-confirm/"
    ).post(formData);

    if (success) {
      notification.success({
        message: "Password changed succuessfully."
      });
      setLoading(false);
      history.push("/login");
    } else {
      notification.error({
        message:
          data?.error?.password ||
          data?.error?.token ||
          "Something went wrong. Couldn't change password."
      });
      setLoading(false);
      setFormData({});
    }
  };

  return (
    <section className="bg-home">
      <div className="home-center">
        <Head>
          <title>Reset Password | Study Info Centre</title>
        </Head>

        <div className="home-desc-center">
          <div className="container">
            <Row className="align-items-center">
              <Col lg={8} md={6}>
                <div className="mr-lg-5">
                  <img
                    loading="lazy"
                    src="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Forget-password.png"
                    className="img-fluid"
                    alt="forget password"
                  />
                </div>
              </Col>
              <Col lg={4} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="login_page bg-white shadow rounded p-4">
                  <div className="text-center">
                    <h4 className="mb-4">Recover Account</h4>
                  </div>
                  <form
                    className="login-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit();
                    }}
                  >
                    <Row>
                      <Col lg={12}>
                        <div className="form-group position-relative">
                          <label>
                            New Passwords <span className="text-danger">*</span>
                          </label>
                          <i className="mdi mdi-account ml-3 icons"></i>
                          <input
                            type="password"
                            className="form-control pl-5"
                            placeholder="Enter Your new Paassword"
                            id="password"
                            value={formData?.password}
                            onChange={changeHandler}
                            required
                            autoComplete="off"
                          />
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="form-group position-relative">
                          <label>
                            Confirm Passwords
                            <span className="text-danger">*</span>
                          </label>
                          <i className="mdi mdi-account ml-3 icons"></i>
                          <input
                            autoComplete="off"
                            type="password"
                            className="form-control pl-5"
                            id="confirm_password"
                            placeholder="Enter Your Confirm Paassword"
                            value={formData?.confirm_password}
                            onChange={changeHandler}
                            required
                          />
                          {showConfirmMessage &&
                          formData?.password !== formData?.confirm_password ? (
                            <div class="ant-form-item-explain text-secondary">
                              <div>Password does not matches.</div>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={12}>
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={loading}
                        >
                          {loading ? (
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "Update Password"
                          )}
                        </button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryPassword;
