import { notification } from "antd";
import APIServices from "src/apiUtils/APIServices";
import React, { useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from 'next/image'
const myLoader = ({ src, width, quality }) => {
  return `https://s3.ap-south-1.amazonaws.com/${src}?w=${width}&q=${quality || 75}`
}


const ForgotPassword = (_) => {
  const [email, setEmail] = useState();
  const history = useRouter();
  const [loading, setLoading] = useState(false);
  const submit = async (_) => {
    setLoading(true);
    const { data, success } = await new APIServices("rest-password/").post({
      email
    });

    if (success) {
      setLoading(false);
      notification.success({
        message: `Password reset link sent to:${email}. Please check your email.`
      });
      history.push("/");
    } else {
      setLoading(false);
      notification.error({
        message:
          data?.error?.email ||
          "Something went wrong. Couldn't sent password reset link."
      });
    }
  };

  return (
    <section className="bg-home">
      <Head>
        <title>Forget Password | Study Info Centre</title>
      </Head>

      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <Row className="align-items-center">
              <Col lg={8} md={6}>
                <div className="mr-lg-5">
                  <Image
                    loading="lazy"
                    loader={myLoader}
                    src="/studyinfocentre.com/Banner/Forget-password.png"
                    width={500}
                    height={500}
                                       
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
                        <p className="text-muted">
                          Please enter your email address.You will receive a
                          link to create a new password via email.
                        </p>
                        <div className="form-group position-relative">
                          <label>
                            Email address <span className="text-danger">*</span>
                          </label>
                          <i className="mdi mdi-account ml-3 icons"></i>
                          <input
                            type="email"
                            className="form-control pl-5"
                            placeholder="Enter Your Email Address"
                            name="email"
                            value={email}
                            onChange={({ target: { value } }) =>
                              setEmail(value)
                            }
                            required
                          />
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
                            "Send"
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

export default ForgotPassword;
