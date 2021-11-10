import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem } from "reactstrap";

import EnglishTestWrapper from "./EnglishTestWrapper";

import {
  AcademicRequirements,
  OtherTests,
  OtherRequirements,
  FeesAndFunding
} from "./Requirements";
import { Empty } from "antd";
import { getStudyMode, getStudyLoad } from "src/utilities/studyModeLoadUtil";
import Link from "next/link";

const CourseOverview = ({
  course_fee,
  course_career,
  course_structure,
  course_other_test,
  student_visa,
  other_requirements,
  english_requirement = [],
  education_requirement = [],
  category_name,
  degree_level_name,
  study_load,
  study_mode,
  address,
  course_scholarship,
  url
}) => {
  const [state, setState] = useState({ active: "1" });

  const toggle = (tab) => {
    if (state.active !== tab) {
      setState({ ...state, active: tab });
    }
  };

  return (
    <React.Fragment>
      <Nav
        pills
        className="nav-active-bordered-pill sticky mr-lg-3 mt-4 shadow bordered pb-3 bg-white"
        style={{ justifyContent: "space-evenly", zIndex: 1 }}
      >
        <NavItem>
          <a
            className={state.active === "1" ? "active nav-link" : "nav-link"}
            onClick={() => {
              toggle("1");
            }}
            href="#!"
          >
            Overall Course
          </a>
        </NavItem>
        <NavItem>
          <a
            href="#!"
            className={state.active === "2" ? "active nav-link" : "nav-link"}
            onClick={() => {
              toggle("2");
            }}
          >
            Requirement
          </a>
        </NavItem>
        <NavItem>
          <a
            href="#!"
            className={state.active === "5" ? "active nav-link" : "nav-link"}
            onClick={() => {
              toggle("5");
            }}
          >
            Fee & Funding
          </a>
        </NavItem>
        <NavItem>
          <a
            href="#!"
            className={state.active === "4" ? "active nav-link" : "nav-link"}
            onClick={() => {
              toggle("4");
            }}
          >
            Careers
          </a>
        </NavItem>
        <NavItem>
          <a
            href="#!"
            className={state.active === "3" ? "active nav-link" : "nav-link"}
            onClick={() => {
              toggle("3");
            }}
          >
            Student Visa
          </a>
        </NavItem>
      </Nav>
      <div className="mr-lg-3 mt-4 overflow-hidden pt-4 shadow rounded">
        <TabContent className="container  p-4" activeTab={state.active}>
          <TabPane tabId="1">
            <>
              <div className="row mb-4">
                {!!getStudyMode(study_mode) ? (
                  <div className="col-lg-6">
                    <strong>Study Mode: </strong>
                    {getStudyMode(study_mode)} <br />
                  </div>
                ) : null}

                {!!getStudyLoad(study_load) ? (
                  <div className="col-lg-6">
                    <strong>Study Load: </strong>
                    {getStudyLoad(study_load)}
                    <br />
                  </div>
                ) : null}

                {!!category_name ? (
                  <div className="col-lg-6">
                    <strong>Course Category: </strong>
                    {category_name}
                    <br />
                  </div>
                ) : null}

                {!!degree_level_name ? (
                  <div className="col-lg-6">
                    <strong>Degree Level: </strong>
                    {degree_level_name}
                  </div>
                ) : null}

                {address?.length ? (
                  <div className="col-lg-12">
                    <strong>Location: </strong>
                    <br></br>
                    {address?.map(
                      ({
                        street_address,
                        postal_code,
                        city_name,
                        state,
                        suburb,
                        country_name
                      }) =>
                        suburb ? (
                          <span className="ml-4">
                            {`${street_address},
                          ${suburb},
                          ${state},
                          ${postal_code},
                          ${country_name}`}
                            .{<br></br>}
                          </span>
                        ) : (
                          <span className="ml-4">
                            {`${street_address},
                          ${city_name},
                          ${state},
                          ${postal_code},
                          ${country_name}`}
                            .{<br></br>}
                          </span>
                        )
                    )}
                  </div>
                ) : null}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: course_structure?.structure
                }}
              />
              <div className="my-4">
                Visit the&nbsp;
                <a href={url} target="_blank">
                  official programme website
                </a>
                &nbsp; for more information.
              </div>
            </>
          </TabPane>
          <TabPane tabId="2">
            <>
              {!!education_requirement?.length ? (
                <AcademicRequirements
                  education_requirement={education_requirement}
                />
              ) : null}
              <EnglishTestWrapper requirements={english_requirement} />
              <OtherTests
                other_test={course_other_test?.length ? course_other_test : []}
              />

              {!!other_requirements?.requirement ? (
                <OtherRequirements other_requirements={other_requirements} />
              ) : null}
              <div className="my-4">
                Visit the&nbsp;
                <a href={url} target="_blank">
                  official programme website
                </a>
                &nbsp; for more information.
              </div>
            </>
          </TabPane>

          <TabPane tabId="3">
            {!!student_visa?.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: student_visa?.description }}
              />
            ) : (
              <Empty />
            )}
          </TabPane>

          <TabPane tabId="4">
            <>
              <div
                dangerouslySetInnerHTML={{ __html: course_career?.career }}
              />
              <div className="my-4">
                Visit the&nbsp;
                <a href={url} target="_blank">
                  official programme website
                </a>
                &nbsp; for more information.
              </div>
            </>
          </TabPane>

          <TabPane tabId="5">
            <>
              {course_fee?.map((fee, idx) => (
                <FeesAndFunding key={`fee-card-${idx}`} fee={fee} />
              ))}

              {!!course_scholarship?.scholarship ? (
                <div className="mt-4">
                  <h4>Scholarships</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: course_scholarship?.scholarship
                    }}
                  />
                </div>
              ) : null}

              <div className="my-4">
                Visit the &nbsp;
                <a href={url} target="_blank">
                  official programme website
                </a>{" "}
                &nbsp; for more information.
              </div>
            </>
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
};

export default CourseOverview;
