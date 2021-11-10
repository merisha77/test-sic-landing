import React from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";
import Link from "next/link";
import useWidth from "src/utilities/widthUtil";

const ConnectWithUs = ({
  image = "https://studyinfocentre.com/Banner/connect+with+us.png",
  description,
}) => {
  const { isTablet, isMobile } = useWidth();
  return (
    <section className='section connect-us-home'>
      <div className='container'>
        <Row className='align-items-center connect-us-row'>
          <Col md={6} className='col-12 mt-4 mt-sm-0 pt-2 pt-sm-0'>
            <div className='section-title ml-lg-4'>
              <h4 className='title mb-4 text-primary'>Connect With Us</h4>
              {!!description ? (
                <div
                  className='pt-4'
                  style={{ textAlign: "justify" }}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              ) : (
                <Empty />
              )}
              <div className='button-group text-center'>
                <Link href='/ask' prefetch={false}>
                  <a
                    className={`btn btn-secondary mt-3 col-lg-4 ${
                      isMobile && "connect-us-buttons"
                    }`}
                  >
                    Student
                  </a>
                </Link>
                <Link href='/institutions' prefetch={false}>
                  <a
                    className={`btn btn-secondary ml-3 mt-3 col-lg-4 ${
                      isMobile && "connect-us-buttons"
                    }`}
                  >
                    Institutions
                  </a>
                </Link>
                <Link href='/recruitment-partners' prefetch={false}>
                  <a
                    className={`btn btn-secondary ml-3 mt-3 col-lg-4 ${
                      isMobile && "connect-us-buttons"
                    } `}
                  >
                    Recruitment Partners
                  </a>
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <img
              loading='lazy'
              src={image}
              className='img-fluid mover'
              alt='bog'
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ConnectWithUs;
