import Link from "next/link";
import React from "react";
import { ChevronRight } from "react-feather";
import { CardBody, Row, Col } from "reactstrap";

const CategoryWrapper = ({ name, attachment, description, slug }) => (
  <div className="app-ecommerce-details">
    <CardBody className="pb-0">
      <Row className="mb-5 mt-2 ">
        <Col className=" " md="12" sm="12">
          <Row>
            <Col md="" sm="12">
              <span className="d-flex justify-content-start align-items-center">
                <img
                  loading="lazy"
                  src={attachment}
                  alt={name}
                  height="80"
                  className="mr-3 mb-2"
                  width="80"
                />
                <h4 className="text-primary ">{name}</h4>
              </span>
              <div className="d-flex flex-wrap"></div>
              <p>{description}</p>
              <Link href={`/search?course=${slug}`}>
                <a className="btn btn-secondary">
                  View Courses <ChevronRight />
                </a>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </CardBody>
  </div>
);

export default CategoryWrapper;
