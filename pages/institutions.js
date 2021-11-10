import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Row, Col } from "reactstrap";
import { GetInTouchForm } from "src/pages/info/Contact";

const PartnerInstitute = () => {
  return (
    <>
      <Head>
        <title>Institution Partner | Study Info Centre</title>
        <meta name="title" content="Institution Partner | Study Info Centre" />
      </Head>
      <section className="bg-half bg-light institution partner-wrapper">
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
                          Institution Partner
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
                With the increase in the quality of education, there has been an
                increasing number of educational institutions abroad and within
                the country. Most of the courses and programs offered by your
                institution may seem similar to others. The outreach efforts
                through various promotional campaigns and marketing strategies
                may not suffice in connecting with your right audience.
                Studyinfocentre.com features your institution helping create and
                establish visibility amid a wider mass. Knowing what you offer
                is not always enough; you will have to convince them with other
                various aspects. The portal imparts reliable information about
                those various and unique courses, programs, scope and
                opportunities offered by your institution thereby promoting the
                quality education the student can expect. Our platform
                facilitates and ensures that the students make an informed
                decision about their higher education; equally being aware of
                your branding requirements.
              </p>
            </div>
          </div>
          <Row className="justify-content-center ">
            <Col lg={6} className="text-center mt-5">
              <div className="page-next-level align-items-center">
                <h4 className="title m-2 p-2 rounded bg-secondary text-white">
                  Partner with Study Info Centre
                </h4>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center ">
            <GetInTouchForm
              title="Partner with Study Info Centre"
              isInstitution={true}
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
};

export default PartnerInstitute;

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
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Clg/Global+Reach.png",
    title: "Increase your outreach around the world."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Clg/Application.png",
    title: "Get quality applications via our recruitment partners."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Clg/institution+%26+courses.png",
    title:
      "Promote your institution & courses to the right audience via our portal."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Clg/promotional+budget.png",
    title: "Cut off your promotional budget."
  },
  {
    img: "https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Agent+Clg+/Clg/expanding.png",
    title: "Access more recruiters without expanding operations"
  }
];
