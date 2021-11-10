import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notification } from "antd";

import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { Row, Col } from "reactstrap";
import APIServices from "src/apiUtils/APIServices";
import { valueChanged } from "src/actions/authActions";
import { useRouter } from "next/router";

const SocialLogin = ({ isLogin }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const facebookResponse = ({ accessToken }) =>
    submitData("exchange/facebook/", { access_token: accessToken });

  const googleResponse = (response) => {
    submitData("exchange/google-oauth2/", {
      access_token: response?.accessToken
    });
  };

  const submitData = async (url, formData) => {
    const { data, success } = await new APIServices(url).post(formData);
    if (success) {
      const { access, user_data } = {
        access: "undefined",
        user_data: {},
        ...data
      };
      window.localStorage.setItem("user", JSON.stringify(user_data));
      dispatch(valueChanged("creds", { isLoggedIn: true, access, user_data }));
    } else {
      notification.warning({ message: "Could not authenticate." });
    }
  };

  useEffect(() => {
    if (router.asPath.includes("access_token")) {
      facebookResponse({
        accessToken: new URLSearchParams(router.asPath.split("#")[1]).get(
          "access_token"
        )
      });
    }
  }, [router]);

  return (
    <>
      <div className="text-center bold">Or</div>
      <Row>
        <Col lg={6} className="mt-3" md={6}>
          <FacebookLogin
            appId={process?.env?.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={facebookResponse}
            cssClass="btn btn-sm btn-primary social-login-btn col col-lg-12 shadow"
            icon="fa-facebook p-2"
            responseType="token"
            redirectUri={`${process.env.NEXT_PUBLIC_SITE_URL}/login`}
          />
        </Col>
        <Col lg={6} className="mt-3" md={6}>
          <GoogleLogin
            clientId={process?.env?.NEXT_PUBLIC_GOOGLE_APP_ID}
            buttonText="Login With Google"
            onSuccess={googleResponse}
            // onFailure={googleResponse}
            className="col col-lg-12 btn btn-md h-100"
          />
        </Col>
      </Row>
    </>
  );
};

export default SocialLogin;
