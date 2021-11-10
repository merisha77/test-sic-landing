import React, { useEffect, useState } from "react";
import { Card, CardBody, CardImg, Row, Col } from "reactstrap";

import Link from "next/link";
import useWidth from "src/utilities/widthUtil";
import APIServices from "src/apiUtils/APIServices";

const RecommandUniversity = ({ country }) => {
  const [recommendedUniversities, setRecommendedUniversities] = useState();
  const fetchRecommendedUniversities = async () => {
    const { data, success } = await new APIServices(
      `recommended-institute/?country=${country}&size=4`
    ).get();
    if (success) setRecommendedUniversities(data?.data);
  };

  useEffect(() => {
    fetchRecommendedUniversities();
  }, [country]);

  return (
    <Row>
      <Col className="details-page-swiper text-center " sm="12">
        <div className="heading-section mb-3">
          <h3 className="text-uppercase mb-50 text-primary">
            Featured University
          </h3>
          <p>People also search for these Universities.</p>
        </div>
        <Row>
          {recommendedUniversities?.map((institute, idx) => (
            <InstituteCard key={institute?.slug + idx} institute={institute} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};
export default RecommandUniversity;

const InstituteCard = ({ institute }) => {
  const { isMobile } = useWidth();
  return (
    <Col lg="3" md="4" sm="6" className="col-6 trm-hv">
      <Card className="shadow rounded">
        <Link href={`/institute-detail/${institute?.slug}`}>
          <a>
            <CardImg
              top
              className="img-fluid"
              src={`${process.env.NEXT_PUBLIC_MEDIA + institute?.logo}`}
              alt="card image cap"
              style={{
                width: "auto",
                height: isMobile ? "100px" : "200px",
                margin: "auto",
                padding: isMobile ? "1rem" : "2rem"
              }}
            />
          </a>
        </Link>
      </Card>
    </Col>
  );
};
