import React from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";

import WorkProcessCard from "./WorkProcessCard";

const WorkProcess = ({ how_it_work }) => {
  return (
    <section className="section bg-light">
      <div className="container">
        <Row className="justify-content-center">
          <Col className="text-center">
            <div className="section-title">
              <h4 className="main-title mb-4 text-primary">How it Works ?</h4>
            </div>
          </Col>
        </Row>

        {how_it_work?.length ? (
          <Row>
            <div className="flex-column col-lg-4">
              <WorkProcessCard
                url="/search"
                {...how_it_work?.find((h) => h?.info_type === "explore")}
              />
              </div>
              <div className="flex-column col-lg-4">
              <WorkProcessCard
                url="/search"
                {...how_it_work?.find((h) => h?.info_type === "compare")}
              />
              </div>
              <div className="flex-column col-lg-4">
              <WorkProcessCard
                url="/login"
                {...how_it_work?.find((h) => h?.info_type === "apply")}
              />
              </div>
            
        {/*      <div className="intro-video col-lg-5">
              {
              <iframe
                className="rounded"
                src="https://www.youtube.com/embed/uA_EG8NtUXQ?autoplay=1&modestbranding=1&mute=1&rel=0"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div> */}
          </Row>
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
};

export default WorkProcess;
