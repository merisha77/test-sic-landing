// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";

import useWidth from "src/utilities/widthUtil";

import CourseCategoryCard from "./CourseCategoryCard";

const CourseCategory = ({ categories = [] }) => {
  const { isMobile } = useWidth();
  const [showAll, setShowAll] = useState(isMobile ? false : true);
  useEffect(() => {
    isMobile && setShowAll(false);
  }, [isMobile]);
  return (
    <section className="section bg-white">
      <div className="container">
        <Row className="justify-content-center">
          <Col className="text-center">
            <div className="section-title mb-4 pb-2">
              <h4 className="main-title mb-4 text-primary">Course Category</h4>
              <p className="text-muted para-desc mx-auto mb-0"></p>
            </div>
          </Col>
        </Row>

        {categories?.length ? (
          <Row>
            {categories
              ?.slice(0, showAll ? categories?.length : 4)
              ?.map(({ name, attachment, icon, slug }, idx) => (
                <CourseCategoryCard
                  label={name}
                  icon={
                    // <img
                    //   loading="lazy"
                    //   style={{ height: "auto", width: "100%" }}
                    //   src={`${process.env.NEXT_PUBLIC_MEDIA}${attachment}`}
                    //   alt={name}
                    // />
                    <i className={icon}></i>
                  }
                  slug={slug}
                  key={`category-card-${idx}`}
                />
              ))}
            {categories?.length > 4 ? (
              <div
                style={{ width: "95%", margin: "auto" }}
                className="d-lg-none d-md-none btn text-primary"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Hide" : "Show More..."}
              </div>
            ) : null}
          </Row>
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
};

export default CourseCategory;
