import React from "react";
import { Row, Col } from "reactstrap";

import SignUpWrapper from "src/components/drawer/SignUpWrapper";

import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

const Signup = (_) => {
  const history = useRouter();
  const creds = useSelector((state) => state.auth?.get("creds"));

  const isLoggedIn = (_) => {
    if (Boolean(creds?.isLoggedIn)) return true;
    if (typeof window !== "undefined") {
      if (Boolean(window.localStorage.getItem("token"))) return true;
      return false;
    } else {
      return false;
    }
  };
  if (isLoggedIn()) return (_) => history.push("/account");
  return (
    <section className="bg-half bg-light">
      <Head>
        <title>User Signup | Study Info Centre</title>
      </Head>

      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <Row className="align-items-center">
              <Col lg={8} md={6}>
                <div className="mr-lg-5">
                  <img
                    loading="lazy"
                    src="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/sing-up.png"
                    className="img-fluid"
                    alt="sign up"
                  />
                </div>
              </Col>
              <SignUpWrapper
                lg={4}
                md={6}
                className="mt-4 mt-sm-0 pt-2 pt-sm-0 bg-white shadow rounded p-4"
              />
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
