import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "reactstrap";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Divider, Button, notification, Empty } from "antd";

import { DoubleRightOutlined } from "@ant-design/icons";
import APIServices from "src/apiUtils/APIServices";
import InputField from "src/pages/StudyInfoCentre/InputField";

const Interest = ({ interests, fetchInterest, showDetail = true, onSkip }) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [interest, setInterest] = useState();
  const [institutes, setInstitutes] = useState([]);
  const [showInterests, setShowInterests] = useState(showDetail);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async (_) => {
    const { data, success } = await new APIServices(
      "drop_down/institute/"
    ).get();
    success && setInstitutes(data?.data);
  };

  const fetchCourses = async (instituteId) => {
    const { data, success } = await new APIServices(
      `drop_down/course/?institute_id=${instituteId}`
    ).get();
    if (success) setCourses(data?.data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id && a.value !== "") data[a.id] = a.value;
      } else isValid = false;
    });
    if (!!isValid) !!data.id ? onUpdate(data) : onCreate(data);
  };

  const onCreate = async (dta) => {
    const { success, data } = await new APIServices(
      "profile/client-interest/"
    ).post(dta);
    if (success) {
      notification.success({ message: "Interest created successfully!" });
      fetchInterest();
      setShowInterests(true);
      setErrors({});
    } else {
      setErrors(data?.error);
      notification.error({ message: "Could not create new interest." });
    }
  };

  const onUpdate = async (dta) => {
    const { success, data } = await new APIServices(
      "profile/client-interest"
    ).put(dta?.id, dta);
    if (success) {
      notification.success({ message: "Interest updated successfully!" });
      fetchInterest();
      setShowInterests(true);
      setErrors({});
    } else {
      setErrors(data?.error);
      notification.error({ message: "Could not update interest." });
    }
  };

  const onDelete = async (id) => {
    const { success } = await new APIServices("profile/client-interest").delete(
      id
    );
    if (success) {
      notification.success({ message: "Interest deleted successfully!" });
      fetchInterest();
      setShowInterests(true);
    } else {
      notification.error({ message: "Could not delete interest." });
    }
  };
  if (!showDetail && interests?.length) {
    return null;
  }
  return (
    <Row>
      <Col lg="12" className="mt-4">
        <span className="justify-content-space-between">
          <h5>Interests :</h5>
          {showDetail ? (
            <Button
              className={!!showInterests ? "btn-primary" : "btn-secondary"}
              type={!!showInterests ? "primary" : "danger"}
              onClick={() => setShowInterests(!showInterests)}
            >
              &nbsp; {!!showInterests ? "Add Interest" : "Hide Form"}
            </Button>
          ) : null}
        </span>
        {showInterests ? (
          interests?.length ? (
            <div className="table-responsive bg-white shadow">
              <Table className="mb-0 table-center">
                <thead>
                  <tr>
                    <th scope="col">Institute</th>
                    <th scope="col">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {interests?.map((interest, idx) => (
                    <tr key={`interest-key-${idx}`}>
                      <td>{interest?.institute_name}</td>
                      <td>{interest?.course_name}</td>
                      <td>
                        <button
                          onClick={() => {
                            setInterest(interest);
                            setShowInterests(false);
                          }}
                          className="ant-btn btn-primary"
                        >
                          <EditOutlined style={{ fontSize: 20 }} /> Update
                        </button>
                        &nbsp;
                        <button
                          className="ant-btn btn-secondary"
                          onClick={() => onDelete(interest?.id)}
                        >
                          <DeleteOutlined style={{ fontSize: 20 }} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <Empty />
          )
        ) : (
          <InterestForm
            onBackClick={() => setShowInterests(true)}
            onSubmit={submitHandler}
            data={interest}
            institutes={institutes}
            fetchCourses={fetchCourses}
            courses={courses}
            onSkip={onSkip}
            errors={errors}
            showDetail={showDetail}
          />
        )}
      </Col>
    </Row>
  );
};

export default Interest;

const InterestForm = ({
  onBackClick,
  onSubmit,
  data,
  institutes = [],
  courses = [],
  fetchCourses,
  showDetail,
  onSkip,
  errors
}) => {
  const [formData, setFormData] = useState();

  useEffect(() => {
    !!formData?.institute && fetchCourses(formData?.institute);
  }, [formData?.institute]);

  return (
    <div className="col col-sm-12">
      <form onSubmit={onSubmit}>
        <h6>Choose Institution and Course you want to study</h6>
        <Row>
          <input id="id" value={data?.id || undefined} type="hidden" />

          <input type="hidden" id="institute" value={formData?.institute} />

          <InputField
            error={errors?.institute}
            id="institute1"
            label="Institute"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                institute: institutes?.find(({ id, name }) => name === value)
                  ?.id
              })
            }
            list="institutes"
            defaultValue={formData?.institute}
          />
          <datalist id="institutes">
            {institutes?.map(({ id, name }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </datalist>

          <input type="hidden" id="course" value={formData?.course} />

          <InputField
            error={errors?.course}
            id="course1"
            label="Course"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                course: courses?.find(({ id, name }) => name === value)?.id
              })
            }
            list="courses"
            defaultValue={formData?.course}
          />
          <datalist id="courses">
            {courses?.map(({ id, name }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </datalist>
        </Row>

        <Divider />

        <div
          className={`pull-right ${
            showDetail ? "" : "d-flex justify-content-center align-items-center"
          }`}
          style={{ marginBottom: 16 }}
        >
          <button
            className={
              showDetail
                ? "ant-btn btn-primary pull-right"
                : "btn btn-secondary btn-lg"
            }
            name="submit-button"
            type="submit"
          >
            {showDetail ? (
              "Confirm"
            ) : (
              <>
                Save & Continue&nbsp;
                <DoubleRightOutlined size={15} />
              </>
            )}
            &nbsp;
          </button>
          &nbsp;
          {showDetail ? (
            <button
              className="ant-btn btn-secondary pull-right"
              onClick={onBackClick}
            >
              Cancel
            </button>
          ) : (
            <u
              className="text-info ml-5 f-400 h6"
              onClick={onSkip}
              type="button"
            >
              <strong>Skip</strong>
            </u>
          )}
        </div>
      </form>
    </div>
  );
};
