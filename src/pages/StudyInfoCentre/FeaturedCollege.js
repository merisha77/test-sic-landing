// React Basic and Bootstrap
import React from "react";
import { Row, Col } from "reactstrap";

// Import images
import FeaturedCollegeCard from "./FeaturedCollegeCard";

const FeaturedCollege = ({ feature_institute = [] }) => (
  <section className="section bg-white">
    <div className="container">
      <Row className="justify-content-center">
        <Col className="text-center">
          <div className="section-title mb-4 pb-2">
            <h4 className="main-title mb-4">Featured University</h4>
            <p className="text-muted para-desc mx-auto mb-0"></p>
          </div>
        </Col>
      </Row>

      <Row>
        {feature_institute.map(({ name, logo }, idx) => (
          <FeaturedCollegeCard
            label={name}
            icon={
              <img  loading="lazy"
                alt={name}
                src={`${process.env.NEXT_PUBLIC_MEDIA}${logo}`}
                style={{
                  width: "100%",
                  padding: "5px 2rem",
                }}
              />
            }
            key={`category-card-${idx}`}
          />
        ))}
      </Row>
    </div>
  </section>
);

export default FeaturedCollege;
