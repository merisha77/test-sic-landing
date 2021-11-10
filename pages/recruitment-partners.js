import React from "react";

import Link from "next/link";
import { Row, Col } from "reactstrap";
import { GetInTouchForm } from "src/pages/info/Contact";
import Head from "next/head";

const RecruitmentPartner = () => (
  <>
    <Head>
      <title>Recruitment Partner | Study Info Centre</title>
      <meta name="title" content="Recruitment Partner | Study Info Centre" />
    </Head>
    <section className="bg-half bg-light partner-wrapper recruitment">
      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <Row className="justify-content-center">
              <Col lg={12} className="text-center">
                <div className="page-next-level">
                  {/*   <h4 className="title"> Ask Question </h4> */}
                  <ul className="page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0">
                    <li>
                      <Link href="/">
                        <a className="text-uppercase font-weight-bold text-dark">
                          Home
                        </a>
                      </Link>
                    </li>
                    <li>
                      <span className="text-uppercase text-primary font-weight-bold">
                        Recruitment Partner
                      </span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-10">
            <p>
              What you have been doing alone would now be done with our
              multiplied effort! Study Info Centre has a dedicated team helping
              you handle both the application process and student management
              effortlessly and with ease. Along with promoting the courses of
              the affiliated colleges and universities, Study Info Centre
              platform matches student’s to programs and institutions as per
              their background and interest. The vast online platform includes
              the most dynamic and informative website filled with all the
              essential information on higher studies both inside and outside
              the country. Through the platform and counseled by the team of
              experts, students are able to make informed decisions; whichafter
              our reliable partners are supported in the application process
              ensuring the students fulfill their dream of studying abroad
              without any hassle. Study Info Centre is aware of its branding and
              promotional responsibilities meeting your requirements.
            </p>
          </div>
        </div>
        <Row className="justify-content-center ">
          <Col lg={6} className="text-center mt-5">
            <div className="page-next-level align-items-center">
              <h4 className="title m-2 p-2 rounded btn-secondary">
                Work with Study Info Centre
              </h4>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center ">
          <GetInTouchForm
            title="Work with Study Info Centre"
            isInstitution={false}
          />
          <div className="col-lg-8 col-md-12 col-sm-12 pl-md-3 pr-md-3 mt-4 pt-2 institution-items">
            <div className="row">
              {items.map((i, idx) => (
                <ItemCard key={idx} {...i} />
              ))}
            </div>
          </div>
        </Row>
      </div>
    </section>
  </>
);

export default RecruitmentPartner;

const ItemCard = ({ img, title }) => {
  return (
    <div className="item-card rounded bordered shadow col-lg-3 col-md-3 col-sm-12 col-12  trm-hv">
      <img src={img} />
      <span className="detail text-primary">{title}</span>
    </div>
  );
};
const items = [
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Clg/Application.png",
    title: "Easy application processing system."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Agent/management+system.png",
    title: "Smooth student management system."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Agent/perfect+course.png",
    title:
      "Find a perfect course that fits your student’s interest and background."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Agent/counselors.png",
    title: "Get advantage of expert counselors and filter the qualified."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Agent/Growth+and+promotion.png",
    title: "Growth and promotion with less effort."
  }
];
