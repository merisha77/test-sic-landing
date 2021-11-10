import React, { useState } from "react";
import { Row, Col } from "reactstrap";

import { Empty } from "antd";
import Link from "next/link";
import Head from "next/head";

const pages = {
  about: "About Us",
  terms: "Terms & Condition",
  privacy: "Privacy"
};

const InfoPage = ({ data, type }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{pages[type]} | Study Info Centre</title>
        <meta name="title" content={`${pages[type]} | Study Info Centre`} />
      </Head>
      <section className="bg-half bg-light about-us-wrapper">
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <Row className="justify-content-center">
                <Col lg={12} className="text-center">
                  <div className="page-next-level">
                    {/* <h4 className="title"> {pages[type]} </h4> */}
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
                          {pages[type]}
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
          <Row className="align-items-center">
            {type === "about" ? (
              <Col lg={5} md={5} className="mt-4 pt-2 mt-sm-0 pt-sm-0">
                <div className="position-relative">
                  <img
                    loading="lazy"
                    src="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Study+Info+Centre+logo.png"
                    className="rounded img-fluid mx-auto d-block"
                    alt="bog"
                  />
                </div>
              </Col>
            ) : null}

            <Col
              lg={type === "about" ? 7 : 12}
              md={type === "about" ? 7 : 12}
              className="mt-4 pt-2 mt-sm-0 pt-sm-0"
            >
              <div className="section-title ml-lg-4">
                <h4 className="title mb-4">{pages[type]} </h4>
                {!!data?.description ? (
                  <div
                    className="text-muted"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  />
                ) : (
                  <Empty />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};
export default InfoPage;
