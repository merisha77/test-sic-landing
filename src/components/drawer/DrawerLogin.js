import React from "react";
import { Row, Col } from "reactstrap";

import LoginWrapper from "./LoginWrapper";

const DrawerLogin = () => {
  return (
    <section className="cover-user bg-white">
      <div className="container-fluid">
        <Row className="position-relative">
          <Col lg={12} className="cover-my-30 order-2">
            <div className="d-flex align-items-center">
              {/* <Row> */}
                <LoginWrapper />
              {/* </Row> */}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default DrawerLogin;
