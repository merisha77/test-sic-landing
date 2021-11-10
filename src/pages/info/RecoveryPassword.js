import React from "react";
import { Row, Col } from "reactstrap";

import recoveryimg from "styles/images/user/recovery.png";
import { InputField } from "src/pages/info/AskQuestion";

const RecoveryPassword = (_) => {
  const [email, setEmail] = useState();

  const forgetPassword = (e) => {
    e.preventDefault();
  };
  return (
    <section className="bg-half bg-light">
      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <Row className="align-items-center">
              <Col lg={8} md={6}>
                <div className="mr-lg-5">
                  <img
                    loading="lazy"
                    src={recoveryimg}
                    className="img-fluid"
                    alt="recover"
                  />
                </div>
              </Col>
              <Col lg={4} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                <div className="login_page bg-white shadow rounded p-4">
                  <div className="text-center">
                    <h4 className="mb-4">Recover Account</h4>
                  </div>
                  <form className="login-form" onSubmit={forgetPassword}>
                    <Row>
                      <Col lg={12}>
                        <p className="text-muted">
                          Please enter your email address. You will receive a
                          link to create a new password via email.
                        </p>
                        <InputField
                          label="Email"
                          id="email"
                          value={email}
                          onChange={({ target: { value } }) => setEmail(value)}
                          icon={<i className="mdi mdi-account ml-3 icons"></i>}
                          required
                        />
                      </Col>
                      <Col lg={12}>
                        <button type="button" className="btn btn-primary w-100">
                          Send
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
