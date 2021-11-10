import React from "react";
import { Row, Col } from "reactstrap";
import SignUpWrapper from "./SignUpWrapper";

const DrawerSignUp = () => (
  <section className="cover-user bg-white">
    <div className="container-fluid">
      <Row className="position-relative">
        <Col lg={12} className="cover-my-30 order-2">
          <div className="d-flex align-items-center">
            <Row>
              <SignUpWrapper width={12} />
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  </section>
);

export default DrawerSignUp;
