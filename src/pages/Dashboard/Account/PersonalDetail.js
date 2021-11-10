import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import APIServices from "src/apiUtils/APIServices";
import { Button, notification } from "antd";
import PersonalDetailForm from "./PersonalDetailForm";

const PersonalDetail = ({
  data,
  dropdownData,
  fetchData,
  showDetail = true,
}) => {
  const [showPersonlaDetail, setShowPersonlaDetail] = useState(showDetail);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    const data = new FormData();
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id && !a.id.includes("unused")) {
          if (!!a.value || !!a.files?.length)
            data.append(a.id, a.id === "avatar" ? a.files[0] : a.value);
        }
      } else {
        isValid = false;
      }
    });
    if (isValid) onUpdate(data);
  };

  const onUpdate = async (data) => {
    const { id } = JSON.parse(window.localStorage?.getItem("user") || "{}");
    const { success } = await new APIServices(`profile/${id}/`).put(0, data);
    if (success) {
      notification.success({ message: "Profile updated successfully!" });
      fetchData();
      if (showDetail) {
        setShowPersonlaDetail(true);
      }
    } else {
      notification.error({ message: "Could not update data." });
    }
  };
  useEffect(() => {
    if (!showDetail) setFormData(data);
  }, [data]);
  const [formData, setFormData] = useState(data);

  return (
    <Row>
      <Col lg="12" className="mt-4">
        <span className="justify-content-space-between">
          <h5>Personal Details :</h5>
          {showDetail ? (
            <Button
              className={!!showPersonlaDetail ? "btn-primary" : "btn-secondary"}
              type={!!showPersonlaDetail ? "primary" : "danger"}
              onClick={() => setShowPersonlaDetail(!showPersonlaDetail)}
            >
              &nbsp;
              {!!showPersonlaDetail ? "Edit Personal Detail" : "Hide Form"}
            </Button>
          ) : null}
        </span>
        {showPersonlaDetail ? (
          <ul className="list-inline mb-0 mt-4">
            <NavPill
              icon={<i className="mdi mdi-email float-left text-muted mr-2" />}
              label="Email"
              value={data?.email}
            />

            <NavPill
              icon={
                <i className="mdi mdi-cake-variant float-left text-muted mr-2" />
              }
              label="Birthday"
              value={data?.dob}
            />
            <NavPill
              icon={
                <i className="mdi mdi-gender-male-female float-left text-muted mr-2" />
              }
              label="Gender"
              value={genders[data?.gender]}
            />

            <NavPill
              icon={
                <i className="mdi mdi-map-marker float-left text-muted mr-2" />
              }
              label="Location"
              value={[
                data?.street,
                data?.postal_code,
                data?.city,
                data?.state,
                data?.country,
              ]
                .filter((a) => !!a)
                .toString()}
            />

            <NavPill
              icon={<i className="mdi mdi-phone float-left text-muted mr-2" />}
              label="Phone"
              value={
                data?.phone_number
                  ? `+${data?.country_code} ${data?.phone_number}`
                  : ""
              }
            />

            <NavPill
              icon={
                <i className="mdi mdi-notebook float-left text-muted mr-2" />
              }
              label="Passport No."
              value={data?.passport_number}
            />

            <NavPill
              icon={
                <i className="mdi mdi-map-marker float-left text-muted mr-2" />
              }
              label="Nationality"
              value={data?.country}
            />
            <NavPill
              icon={
                <i className="mdi mdi-map-marker float-left text-muted mr-2" />
              }
              label="Preferred Country"
              value={data?.preferred_country}
            />

            <NavPill
              icon={
                <i className="mdi mdi-calendar float-left text-muted mr-2" />
              }
              label="Preferred Intake"
              value={data?.preferred_intake}
            />
          </ul>
        ) : (
          <PersonalDetailForm
            data={data}
            onSubmit={submitHandler}
            dropdownData={dropdownData}
            onBackClick={() => setShowPersonlaDetail(true)}
            showDetail={showDetail}
          />
        )}
      </Col>
    </Row>
  );
};
export default PersonalDetail;

const NavPill = ({ icon, label, value = "" }) => (
  <li className="mt-3">
    {icon}
    <div className="overflow-hidden d-block">
      {label} : {value}
    </div>
  </li>
);

const genders = ["Male", "Female", "Other"];
