import React from "react";
import { CardBody, Row, Col } from "reactstrap";

const CountryWrapper = ({ name, image, description }) => (
  <div className=" app-ecommerce-details">
    <CardBody className="pb-0 sm-p-0">
      <Row className="mb-5 mt-2 ">
        <Col className=" " md="12" sm="12">
          <Row>
            <Col
              className="align-items-center justify-content-center"
              sm="12"
              md="12"
            >
              <img loading="lazy" src={image} alt={name} width="100%" />
            </Col>
            <Col md="12" sm="12">
              <h4 className="text-primary ">{name}</h4>
              <div className="d-flex flex-wrap"></div>
              <div
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
  </div>
);

export default CountryWrapper;
