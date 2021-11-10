import React from "react";
import CountUp from "react-countup";
import { Row, Col } from "reactstrap";

const StatsCard = ({ icon, label, count }) => (
  <Col md={4} sm={6} className=" mt-4 pl-2">
    <div className="counter-box text-center">
      <Row>
        <div className="home-icon pl-4">
        {/* <img
            loading="lazy"
            src={icon}
            height="80"
            className="text-light"
            alt="bog"
          />
          */}
          <i className={`mdi mdi-${icon}`}></i>
        </div>
        <div className="watch-video pl-4">
          <h2 className="text-secondary">
            <span className="counter-value text-primary " data-count="2">
              <CountUp start={0} end={count || 0} duration={8} />
            </span>
            +
          </h2>
          <h4 className="counter-head text-primary">{label}</h4>
        </div>
      </Row>
    </div>
  </Col>
);

export default StatsCard;
