//TODO: This needs some slug work

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { Row, Col, Collapse } from "reactstrap";
import { ChevronRight } from "react-feather";

const SubCatgoryWrapper = ({ subcategory }) => {
  const [activeCategory, setActiveCategory] = useState();
  return (
    <Fragment>
      <div className="widget border-bottom p-3">
        <h5 className="mb-0 text-primary">Course Subcategory</h5>
      </div>
      <div className="container ">
        <Row className="align-items-center">
          <Col lg={12} md={6}>
            <div className="faq-content p-4">
              <div className="accordion" id="accordionExample">
                {subcategory?.map((subcategory, idx) => (
                  <CategoryCard
                    key={`category-card-${idx}`}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    {...subcategory}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default SubCatgoryWrapper;

const CategoryCard = ({
  setActiveCategory,
  activeCategory,
  name,
  id,
  description,
  slug
}) => (
  <div className="card border rounded shadow mb-2">
    <a
      href="#!"
      onClick={() => setActiveCategory(activeCategory === name ? "" : name)}
      className={
        activeCategory === name
          ? "faq position-relative text-primary"
          : "faq position-relative text-dark"
      }
    >
      <div className="card-header bg-light p-3">
        <h4 className="title mb-0 faq-question">{name}</h4>
      </div>
    </a>
    <Collapse isOpen={activeCategory === name}>
      <div className="card-body">
        {description}
        <br />
        {/* <Link href={`/course-detail/${id}`}>View Course</Link> */}
        <Link href={`/search?course=${slug}`}>
          <a className="btn btn-secondary mt-4">
            View Courses <ChevronRight />
          </a>
        </Link>
      </div>
    </Collapse>
  </div>
);
