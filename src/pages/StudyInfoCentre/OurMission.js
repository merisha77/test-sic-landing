import React from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";

const OurMission = ({
  description,
  image = "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/SEO_SVG.svg"
}) => (
  <section className="section bg-light">
    <div className="container ">
      <Row className="align-items-center">
        <Col md={6}>
          <img loading="lazy" src={image} className="mr-md-4 mover" alt="bog" />
        </Col>

        <Col md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
          <div className="section-title mr-lg-5">
            <h4 className="title mb-4 text-primary">Our Mission</h4>
            {!!description ? (
              <p className="pt-4" style={{ textAlign: "justify" }}>
                {description}
              </p>
            ) : (
              <Empty />
            )}
          </div>
        </Col>
      </Row>
    </div>
    <div className="container-fluid">
      <Row>
        <div className="home-shape-bottom">
          <img
            loading="lazy"
            src={require("public/styles/images/shapes/round-light.png")}
            alt="bog"
            className="img-fluid mx-auto d-block"
          />
        </div>
      </Row>
    </div>
  </section>
);

export default OurMission;
