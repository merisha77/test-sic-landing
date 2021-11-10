import React, { useState } from "react";
import Link from "next/link";
import { Row, Col, Collapse } from "reactstrap";

import useWidth from "src/utilities/widthUtil";
import Head from "next/head";

const FAQ = ({ data }) => {
  const { isMobile } = useWidth();

  return (
    <React.Fragment>
      <Head>
        <title>Frequently asked questions | Study Info Centre</title>
        <meta
          name="title"
          content="Frequently asked questions | Study Info Centre"
        />
      </Head>
      <section className="bg-half bg-light faq-wrapper">
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <Row className="justify-content-center">
                <Col lg={12} className="text-center">
                  <div className="page-next-level">
                    {/*  <h2 className="title">Frequently Ask Question </h2> */}
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
                          Frequently Ask Question
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
          <Row style={{ flexDirection: isMobile ? "column-reverse" : "unset" }}>
            <Col lg={7} md={6}>
              <div className="faq-content mr-lg-5">
                <div className="accordion" id="accordionExample">
                  {data?.map((faq, idx) => (
                    <FAQContentCard key={`faq-key-${idx}`} {...faq} />
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={5} md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
              <img
                loading="lazy"
                src="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/faq.svg"
                alt="bog"
              />
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FAQ;

const FAQContentCard = ({ question, answer }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="card border rounded shadow mb-2">
      <a
        href="#!"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`faq position-relative text-${
          isCollapsed ? "primary" : "dark"
        }
         `}
      >
        <div className="card-header bg-light p-3">
          <h4 className="title mb-0 faq-question">{question}</h4>
        </div>
      </a>
      <Collapse isOpen={!isCollapsed}>
        <div className="card-body">
          <p className="text-muted mb-0 faq-ans">{answer}</p>
        </div>
      </Collapse>
    </div>
  );
};
