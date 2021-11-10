import React, { useState } from "react";
import Link from "next/link";
import { BookOpen } from "react-feather";
import { Row, Col, Collapse, ListGroup, ListGroupItem } from "reactstrap";

const DegreeWrapper = ({ degree, category }) => {
  const [activeCategory, setActiveCategory] = useState();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <React.Fragment>
      <div
        className="widget border-bottom p-3"
        onClick={(_) => setCollapsed(!collapsed)}
        role="button"
      >
        <h5 className="mb-0 text-primary">{degree}</h5>
      </div>
      <div className={`container ${collapsed ? "d-none" : ""}`}>
        <Row className="align-items-center">
          <Col lg={12} md={12}>
            <div className="faq-content p-1">
              <div className="accordion" id="accordionExample">
                {category?.map((category, idx) => (
                  <CategoryCard
                    key={`category-card-${idx}`}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    {...category}
                  />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DegreeWrapper;

const CategoryCard = ({
  setActiveCategory,
  activeCategory,
  name,
  icon,
  course
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
        <h4 className="title mb-0 faq-question">
          <img  loading="lazy"
            src={process.env.NEXT_PUBLIC_MEDIA + icon}
            alt={name}
            style={{ maxHeight: 30, maxWidth: 30 }}
          />{" "}
          {name}
        </h4>
      </div>
    </a>
    <Collapse isOpen={activeCategory === name}>
      <div className="card-body p-2">
        <ListGroup>
          {course?.map((course, idx) => (
            <Link
              href={`/course-detail/${course?.institute_slug}/${course?.slug}`}
            >
              <a className="text-dark">
                <ListGroupItem key={`course-card-${idx}`}>
                  <BookOpen /> &nbsp;
                  {course?.name}
                </ListGroupItem>
              </a>
            </Link>
          ))}
        </ListGroup>
      </div>
    </Collapse>
  </div>
);
