import React, { useState } from "react";
import { Row, Col, Table } from "reactstrap";
import { Empty } from "antd";
import { getStage } from "src/utilities/stageUtil";
import { getIntake } from "src/utilities/intakeUtil";
import { Modal, Button } from "antd";
import APIServices from "src/apiUtils/APIServices";
const Application = ({ applications = [] }) => {
  const [isVisible, setIsVisible] = useState();
  const [comments, setComments] = useState();

  const fetchComments = async (id) => {
    const { data, success } = await new APIServices(
      `profile/client-applications/${id}`
    ).get();
    if (success) setComments(data?.data?.comment);
  };
  return (
    <Row>
      <Modal
        title="Comments"
        visible={isVisible}
        // onOk={() => setIsVisible(false)}
        footer={null}
        onCancel={(_) => setIsVisible(false)}
      >
        <div className="item">
          {comments?.map((a) => (
            <div
              className={`col-md-${12} my-2 px-0`}
              key={a?.id + new Date().getMilliseconds() + Math.random()}
            >
              <div className="customer-testi text-left">
                <img
                  loading="lazy"
                  src={`${process.env.NEXT_PUBLIC_MEDIA}/${a?.created_by__avatar}`}
                  height="80"
                  className="rounded shadow float-left mr-3"
                  alt="bog"
                />
                <div className="overflow-hidden d-block p-3 shadow rounded bg-white">
                  <p className="text-muted mt-2">" {a?.comment}"</p>
                  <h6 className="text-primary">
                    - {a?.created_by__first_name} {a?.created_by__last_name}
                    <small className="text-muted ml-2">
                      ({a?.created_by__email})
                    </small>
                    <br />
                    <small>{a?.created_at}</small>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Col lg="12" className="mt-4">
        <span className="justify-content-space-between">
          <h5>Application :</h5>
        </span>
        {applications?.length ? (
          <div className="table-responsive bg-white shadow">
            <Table className="mb-0 table-center">
              <thead>
                <tr>
                  <th scope="col">Status</th>
                  <th scope="col">Institute</th>
                  <th scope="col">Course</th>
                  <th scope="col">Address</th>
                  <th scope="col">Intake</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map(
                  (
                    { id, course_name, institute_name, stage, intake, address },
                    idx
                  ) => (
                    <tr
                      key={`application-id-$idx}`}
                      onClick={(_) => {
                        fetchComments(id);
                        setIsVisible(true);
                      }}
                    >
                      <td>{getStage(stage)}</td>
                      <td>{institute_name}</td>
                      <td>{course_name}</td>
                      <td>{address}</td>
                      <td>{getIntake(intake)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  );
};

export default Application;
