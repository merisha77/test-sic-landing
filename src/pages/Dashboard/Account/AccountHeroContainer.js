import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import { Avatar } from "antd";

export const AccountHeroContainer = ({ toggle, userData }) => (
  <section className="bg-profile d-table w-100 bg-light user-dashboard-wrapper">
    <Container>
      <Row>
        <Col lg="12">
          <div
            className="public-profile position-relative p-4 bg-white overflow-hidden rounded shadow"
            style={{ zIndex: "1" }}
          >
            <Row className="align-items-center">
              <Col
                lg="1"
                md="2"
                sm="2"
                className="text-md-left text-center col-1"
              >
                <Avatar
                  shape="circle"
                  size={50}
                  className="bg-primary avatar avatar-medium rounded-pill shadow d-block mx-auto"
                  src={userData?.avatar}
                >
                  {`${userData?.first_name?.slice(
                    0,
                    1
                  )}${userData?.last_name?.slice(0, 1)}`.toUpperCase()}
                </Avatar>
              </Col>

              <Col lg="11" md="10" sm="10" className="col-10">
                <Row className="align-items-center">
                  <Col
                    md="7"
                    sm="10"
                    className="text-md-left text-center mt-4 mt-sm-0 col-7"
                  >
                    <h3 className="title mb-0">{`${userData?.first_name} ${userData?.last_name}`}</h3>
                  </Col>
                  <Col
                    md="5"
                    sm="2"
                    className="text-md-right text-center col-2"
                  >
                    <ul className="list-unstyled profile-icons mb-0 mt-4">
                      <li
                        className="list-inline-item mr-1"
                        onClick={() => toggle("8")}
                      >
                        <a className="rounded-pill">
                          <i className="mdi mdi-settings" title="Settings" />
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);
