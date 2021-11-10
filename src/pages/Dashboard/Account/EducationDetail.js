import React, { useEffect, useState } from "react";
import { Button, Divider, notification, Empty } from "antd";
import { Row, Col, Table } from "reactstrap";

import AcademicsForm from "./AcademicsForm";
import OtherTestForm from "./OtherTestForm";
import EnglishTestForm from "./EnglishTestForm";

import APIServices from "src/apiUtils/APIServices";
import { Minus } from "react-feather";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAcademicScoreType } from "src/utilities/scoreTypeUtil";

const EducationDetail = ({
  otherTests = [],
  englishTests = [],
  educationData = [],
  dropDownData,
  fetchData,
  showDetail = "true",
  onSkip
}) => {
  const [error, setError] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [showEducationDetail, setShowEducationDetail] = useState(showDetail);

  const onCreate = async (dta) => {
    const { success, data } = await new APIServices(
      `profile/client-${showEducationDetail}/`
    ).post(dta);
    if (success) {
      notification.success({
        message: "Education Detail created successfully!"
      });
      fetchData();
      setShowEducationDetail("true");
      setError({});
    } else {
      setError(data?.error);
      notification.error({ message: "Could not add new Detail." });
    }
  };

  const onUpdate = async (data) => {
    const { success } = await new APIServices(
      `profile/client-${showEducationDetail}/${data?.id}/`
    ).put(0, data);
    if (success) {
      notification.success({
        message: "Education Detail updated successfully!"
      });
      fetchData();
      setShowEducationDetail("true");
      setError({});
    } else {
      setError(data?.error);
      notification.error({ message: "Could not update." });
    }
  };

  const onDelete = async (test, id) => {
    const { success } = await new APIServices(`profile/client-${test}`).delete(
      id
    );
    if (success) {
      notification.success({
        message: "Education Detail deleted successfully!"
      });
      fetchData();
      setShowEducationDetail("true");
    } else {
      notification.error({ message: "Could not delete." });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id && !a.id.includes("unused")) {
          if (a.id === "id" && a.value === "") {
          } else data[a.id] = a.value;
        }
      } else isValid = false;
    });
    if (!!isValid) !!data.id ? onUpdate(data) : onCreate(data);
  };

  useEffect(() => {
    if (showDetail !== "true") {
      if (!educationData?.length) setShowEducationDetail("education");
      else if (!englishTests?.length) setShowEducationDetail("english-test");
    }
  }, [englishTests, educationData]);

  const getForm = (key) => {
    switch (key) {
      case "education":
        return (
          <AcademicsForm
            showDetail={showDetail}
            onBackClick={() => setShowEducationDetail("true")}
            onSubmit={submitHandler}
            data={currentData}
            error={error}
            dropDownData={dropDownData}
          />
        );

      case "english-test":
        return (
          <EnglishTestForm
            showDetail={showDetail}
            onBackClick={() => setShowEducationDetail("true")}
            onSubmit={submitHandler}
            data={currentData}
            onSkip={onSkip}
            error={error}
            dropDownData={dropDownData}
          />
        );

      default:
        return (
          <OtherTestForm
            showDetail={showDetail}
            onBackClick={() => setShowEducationDetail("true")}
            onSubmit={submitHandler}
            data={currentData}
            dropDownData={dropDownData}
          />
        );
    }
  };

  return (
    <Row>
      <Col lg="12" className="mt-4">
        <span className="justify-content-space-between">
          <h5>Education Details</h5>

          {showDetail ? (
            showEducationDetail === "true" ? null : (
              <Button
                type="danger"
                className="bg-danger"
                onClick={() => setShowEducationDetail("true")}
              >
                <Minus />
                &nbsp; Hide Form
              </Button>
            )
          ) : null}
        </span>

        {showEducationDetail === "true" ? (
          <ul className="list-inline mb-0 mt-4">
            {showDetail === false && educationData?.length ? null : (
              <li className="mt-3 mb-3">
                <div className="overflow-hidden d-block">
                  <span className="justify-content-space-between mt-3">
                    <h5>Academics</h5>
                    <Button
                      className={
                        !!showEducationDetail ? "btn-primary" : "btn-secondary"
                      }
                      type={
                        showEducationDetail === "true" ? "primary" : "danger"
                      }
                      onClick={() => setShowEducationDetail("education")}
                    >
                      &nbsp; Add Academic Detail
                    </Button>
                  </span>
                  {!!educationData?.length ? (
                    <div className="table-responsive bg-white shadow">
                      <Table className="mb-0 table-center">
                        <thead>
                          <tr>
                            <th scope="col">Degree Title</th>
                            <th scope="col">Degree Level</th>
                            <th scope="col">Study Area</th>
                            <th scope="col">Start Year</th>
                            <th scope="col">End Year</th>
                            <th scope="col">Academic Score</th>
                            <th scope="col">Score Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {educationData?.map((academic, idx) => (
                            <tr key={`academic-key-${idx}`}>
                              <td>{academic?.degree_title}</td>
                              <td>{academic?.degree_level_name}</td>
                              <td>{academic?.category_name}</td>
                              <td>{academic?.start_year}</td>
                              <td>{academic?.end_year}</td>
                              <td>{academic?.academic_score}</td>
                              <td>
                                {getAcademicScoreType(academic?.score_type)}
                              </td>
                              <td className="d-flex">
                                <button
                                  onClick={() => {
                                    setCurrentData(academic);
                                    setShowEducationDetail("education");
                                  }}
                                  className="ant-btn btn-primary"
                                >
                                  <EditOutlined style={{ fontSize: 20 }} />
                                </button>
                                &nbsp;
                                <button
                                  onClick={() =>
                                    onDelete("education", academic?.id)
                                  }
                                  className="ant-btn btn-secondary"
                                >
                                  <DeleteOutlined style={{ fontSize: 20 }} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <Empty />
                  )}
                </div>
              </li>
            )}
            <Divider />
            <li>
              <div className="overflow-hidden d-block">
                <span className="justify-content-space-between mt-3">
                  <h5>English Proficiency</h5>
                  <Button
                    className="btn-primary"
                    type="primary"
                    onClick={() => setShowEducationDetail("english-test")}
                  >
                    &nbsp; Add English Test
                  </Button>
                </span>
                {!!englishTests?.length ? (
                  <div className="table-responsive bg-white shadow">
                    <Table className="mb-0 table-center">
                      <thead>
                        <tr>
                          <th scope="col">Test</th>
                          <th scope="col">listening</th>
                          <th scope="col">Speaking</th>
                          <th scope="col">Writing</th>
                          <th scope="col">Reading</th>
                          <th scope="col">Overall</th>
                        </tr>
                      </thead>
                      <tbody>
                        {englishTests?.map((english, idx) => (
                          <tr key={`english-key-${idx}`}>
                            <td>{english?.english_test}</td>
                            <td>{english?.listening}</td>
                            <td>{english?.speaking}</td>
                            <td>{english?.writing}</td>
                            <td>{english?.reading}</td>
                            <td>{english?.overall_score}</td>
                            <td className="d-flex">
                              <button
                                onClick={() => {
                                  setCurrentData(english);
                                  setShowEducationDetail("english-test");
                                }}
                                className="ant-btn btn-primary"
                              >
                                <EditOutlined style={{ fontSize: 20 }} />
                              </button>
                              &nbsp;
                              <button
                                onClick={() =>
                                  onDelete("english-test", english?.id)
                                }
                                className="ant-btn btn-secondary"
                              >
                                <DeleteOutlined style={{ fontSize: 20 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <Empty />
                )}
              </div>
            </li>
            <Divider />
            <li className="mt-3">
              <div className="overflow-hidden d-block">
                <span className="justify-content-space-between mt-3">
                  <h5>Other Tests</h5>
                  <Button
                    className="btn-primary"
                    type="primary"
                    onClick={() => setShowEducationDetail("other-test")}
                  >
                    &nbsp; Add Other Test
                  </Button>
                </span>
                {!!otherTests?.length ? (
                  <div className="table-responsive bg-white shadow">
                    <Table className="mb-0 table-center">
                      <thead>
                        <tr>
                          <th scope="col">Test</th>
                          <th scope="col">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {otherTests?.map((other, idx) => (
                          <tr key={`other-test-key-${idx}`}>
                            <td>{other?.other_test}</td>
                            <td>{other?.score}</td>
                            <td className="d-flex">
                              <button
                                onClick={() => {
                                  setCurrentData(other);
                                  setShowEducationDetail("other-test");
                                }}
                                className="ant-btn btn-primary"
                              >
                                <EditOutlined style={{ fontSize: 20 }} />
                              </button>
                              &nbsp;
                              <button
                                onClick={() =>
                                  onDelete("other-test", other?.id)
                                }
                                className="ant-btn btn-secondary"
                              >
                                <DeleteOutlined style={{ fontSize: 20 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <Empty />
                )}
              </div>
            </li>
          </ul>
        ) : (
          getForm(showEducationDetail)
        )}
      </Col>
    </Row>
  );
};

export default EducationDetail;
