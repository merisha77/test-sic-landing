import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import { Divider } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";
import { countryCodes } from "public/countries";
const PersonalDetailForm = ({
  onBackClick,
  onSubmit,
  data,
  dropdownData,
  showDetail
}) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userIpDetail"));
    setFormData({
      country: userData?.country,
      city: userData?.city,
      country_code: countryCodes[userData?.countryCode].callingCodes
    });
  }, []);
  return (
    <div className="col col-sm-12">
      <form onSubmit={onSubmit}>
        <Row>
          <input id="id" value={formData?.id || undefined} type="hidden" />
          <InputField
            id="first_name"
            label="First Name"
            required
            width={3}
            defaultValue={formData?.first_name || undefined}
          />
          <InputField
            id="last_name"
            label="Last Name"
            required
            width={3}
            defaultValue={formData?.last_name || undefined}
          />
          <SelectInput
            width={2}
            id="gender"
            label="Gender"
            onChange={(value) => setFormData({ ...formData, gender: value })}
            value={formData?.gender}
            options={
              [
                { key: 0, value: "Male" },
                { key: 1, value: "Female" },
                { key: 2, value: "Other" }
              ] || []
            }
            initAtFirst
          />
          <InputField
            id="avatar"
            label="Avatar"
            type="file"
            width={4}
            defaultValue={undefined}
          />
        </Row>
        <Row>
          <InputField
            id="dob"
            label="Date of Birth"
            type="date"
            required
            width={3}
            defaultValue={formData?.dob || undefined}
          />
          <InputField
            id="email"
            label="Email"
            required
            readOnly
            width={4}
            defaultValue={formData?.email || undefined}
          />

          <SelectInput
            width={2}
            id="country_code"
            label="Country Code"
            onChange={(value) =>
              setFormData({ ...formData, country_code: value })
            }
            value={formData?.country_code || 977}
            options={
              dropdownData?.countries?.map(({ callingCodes }) => ({
                key: callingCodes,
                value: callingCodes
              })) || []
            }
            initAtFirst
          />
          <InputField
            id="phone_number"
            label="Phone Number"
            required
            type="number"
            width={3}
            defaultValue={formData?.phone_number || undefined}
          />
        </Row>
        <Row>
          <SelectInput
            width={3}
            id="country"
            label="Country"
            onChange={(value) => setFormData({ ...formData, country: value })}
            value={formData?.country}
            options={
              dropdownData?.countries?.map(({ name }) => ({
                key: name,
                value: name
              })) || []
            }
            initAtFirst
          />

          <InputField
            id="state"
            label="State"
            width={3}
            defaultValue={formData?.state || undefined}
          />

          <InputField
            id="city"
            label="City"
            required
            width={3}
            value={formData?.city}
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, city: value })
            }
          />

          <InputField
            id="postal_code"
            label="Postal Code"
            width={3}
            defaultValue={formData?.postal_code}
          />
        </Row>

        <Row>
          <InputField
            id="passport_number"
            label="Passport Number"
            width={3}
            defaultValue={formData?.passport_number || undefined}
          />
          <SelectInput
            width={3}
            id="passport_country"
            label="Nationality"
            onChange={(value) =>
              setFormData({ ...formData, passport_country: value })
            }
            value={formData?.passport_country}
            options={
              dropdownData?.countries?.map(({ name }) => ({
                key: name,
                value: name
              })) || []
            }
            initAtFirst
          />

          <SelectInput
            width={3}
            id="preferred_country"
            label="Preferred Country"
            onChange={(value) =>
              setFormData({ ...formData, preferred_country: value })
            }
            value={formData?.preferred_country}
            options={
              dropdownData?.countries?.map(({ name }) => ({
                key: name,
                value: name
              })) || []
            }
            initAtFirst
          />
          <SelectInput
            width={3}
            id="preferred_intake"
            label="Preferred Intake"
            onChange={(value) =>
              setFormData({ ...formData, preferred_intake: value })
            }
            value={formData?.preferred_intake || 2021}
            options={[
              { key: 2021, value: 2021 },
              { key: 2022, value: 2022 },
              { key: 2023, value: 2023 },
              { key: 2024, value: 2024 },
              { key: 2025, value: 2025 }
            ]}
            initAtFirst
          />
        </Row>

        <Divider type="horizontal" />

        <div
          className={`pull-right ${
            showDetail ? "" : "d-flex justify-content-center"
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
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailForm;
