//TODO: Remove Inline Css

import React from "react";
import { Col } from "reactstrap";

const FeaturedCollegeCard = ({ label, icon }) => (
  <Col lg={3} md={3} sm={3}>
    <div className="key-feature d-flex bg-light shadow category-card-wrapper rounded">
      <div style={{ minHeight: "82.6px" }}>{icon}</div>
     {/* <div
        className="content mt-2"
        style={{
          height: "40px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
         <h3 className="title mb-0">{label}</h3>  
      </div>
       */}
    </div>
  </Col>
);

export default FeaturedCollegeCard;
