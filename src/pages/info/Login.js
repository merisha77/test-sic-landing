import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Row, Col } from "reactstrap";

import LoginWrapper from "src/components/drawer/LoginWrapper";

const Login = (_) => {
  const history = useRouter();
  const creds = useSelector((state) => state.auth.get("creds"));

  useEffect(() => {
    if (creds?.isLoggedIn) {
      window.location?.pathname === "/login"
        ? history.push("account")
        : history.back();
    }
  }, [creds]);

  return (
    <section className="bg-half bg-light">
      <Head>
        <title>User Login | Study Info Centre</title>
      </Head>

      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <Row className="align-items-center">
              <Col lg={8} md={6}>
                <div className="mr-lg-5">
                  <img
                    loading="lazy"
                    style={{ maxHeight: 550 }}
                    src="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Login.png"
                    className="img-fluid"
                    alt="login"
                  />
                </div>
              </Col>
              <LoginWrapper
                lg={4}
                className="login-page bg-white shadow rounded p-4"
              />
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
