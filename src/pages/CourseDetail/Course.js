import React from "react";
import { CardBody, Row, Col } from "reactstrap";

const Course = ({ url, description }) => (
  <div className=" app-ecommerce-details">
    <CardBody className="pb-0">
      <Row className="mb-5 mt-2">
        <Col md="12" sm="12">
          <Row>
            <Col md="12" sm="12">
              <h4 className="text-primary">About</h4>
              <div dangerouslySetInnerHTML={{ __html: description }} />
              Visit the &nbsp;
              <a href={url} target="_blank">
                official programme website
              </a>
              &nbsp; for more information.
            </Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
  </div>
);
export default Course;
