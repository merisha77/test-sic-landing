import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, Row, Col } from "reactstrap";

import Link from "next/link";
import APIServices from "src/apiUtils/APIServices";
import { formatCurrency } from "src/utilities/CurrencyUtil";
import getDurationType from "src/utilities/durationUtil";

const CourseRecommand = (props) => {
  const [recommendedCourses, setRecommendedCourses] = useState();
  const fetchRecommendedCourses = async () => {
    const { data, success } = await new APIServices(
      "recommended-course/?size=4"
    ).post(props);
    if (success) setRecommendedCourses(data?.data);
  };

  useEffect(() => {
    fetchRecommendedCourses();
  }, []);

  return recommendedCourses?.length ? (
    <Row>
      <Col className="details-page-swiper text-center " sm="12">
        <div className="heading-section mb-3">
          <h3 className="text-uppercase mb-50 text-primary">Related Course</h3>
          <p>People also search for this course</p>
        </div>
        <Row>
          {recommendedCourses?.map((course, idx) => (
            <CourseCard key={course?.slug + idx} course={course} />
          ))}
        </Row>
      </Col>
    </Row>
  ) : null;
};
export default CourseRecommand;

const CourseCard = ({ course }) => {
  return (
    <Col
      lg={3}
      md={4}
      sm={12}
      className="col-12 trm-hv course-recommend sm-p-0"
    >
      <Link href={`/course-detail/${course?.institute__slug}/${course?.slug}`}  prefetch={false}>
        <a>
          <Card className="shadow rounded p-1 d-flex justify-content-center align-items-center">
            {!!course?.logo ? (
              <CardImg
                top
                className="img-fluid mb-1"
                src={`${process.env.NEXT_PUBLIC_MEDIA + course?.logo}`}
                alt="card image cap"
                height="115"
              />
            ) : (
              <div className="card card-image placeholder bg-light d-flex justify-content-center align-items-center"></div>
            )}
            <CardBody className="d-flex justify-content-center align-items-center flex-column">
              <Link
                href={`/course-detail/${course?.institute__slug}/${course?.slug}`}
                prefetch={false}>
                <a>
                  <h5 className="line-clamp text-primary">{course?.name}</h5>
                </a>
              </Link>
              <span>{course?.institute_name}</span>
              <hr className="my-1" />
              <div className="card-btns d-flex justify-content-between mt-2">
                <div className="d-flex justify-content-center">
                  <p>
                    {!!course?.fee_international ? (
                      <>
                        {formatCurrency(course?.fee_international)}/
                        {getDurationType(course?.per_duration)}
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </a>
      </Link>
    </Col>
  );
};
