import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Collapse } from "reactstrap";
import Link from "next/link";
//import ReCAPTCHA from "react-google-recaptcha";
import APIServices from "src/apiUtils/APIServices";
import { Select, Input, notification } from "antd";
import useEnglishTest from "src/utilities/useEnglishTest";
import { countryCodes } from "public/countries";

import { ChevronDown } from "react-feather";

const CourseEnquiryForm = ({
  course,
  institute,
  name,
  intake,
  country,
  isLarge,
  width = 12
}) => {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState();
  const [dropDownData, setDropDownData] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id && !a.id.includes("unusedId") && a.value !== "") {
          data[a.id] = a.value;
        }
      } else isValid = false;
    });
    if (!!isValid) {
      sendInquery(data, form);
    }
  };

  const sendInquery = async (formData, form) => {
    setLoading(true);
    const { data, success } = await new APIServices("ask-question/").post(
      formData
    );
    if (success) {
      setFormData({});
      notification.success({
        message: "Inquire sent Successfully."
      });
      form.reset();
      setFormData();
    } else {
      notification.error({
        message: data.error
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userIpDetail"));
    setFormData({
      preferred_country: country,
      country: userData?.country,
      city: userData?.city,
      country_code: countryCodes[userData?.countryCode]?.callingCodes,
      preferred_intake: intake
    });
  }, [
    typeof window !== "undefined" &&
      window.localStorage.getItem("userIpDetail"),
    dropDownData?.countries
  ]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    const dta = {};

    const degreeLevels = await new APIServices("drop_down/degree-level/").get();
    if (degreeLevels?.success) dta["degreeLevels"] = degreeLevels?.data?.data;

    const categories = await new APIServices("drop_down/category/").get();
    if (categories?.success) dta["categories"] = categories?.data?.data;
    if (institute) {
      const intakes = await new APIServices(
        `drop_down/institute/intake/?institute_id=${institute}`
      ).get();
      if (intakes?.success) dta["intakes"] = intakes?.data?.data;
    }
    setDropDownData(dta);
  };

  const onChange = (id, value) => setFormData({ ...formData, [id]: value });

  const englishTests = useEnglishTest();

  return (
    <Col lg={width} md={width} className="cmr-lg-3 ol-12 mt-4 pt-2 pt-sm-0">
      <div className="sidebar mt-sm-30 p-4 rounded shadow">
        <div className="widget mb-4 pb-2">
          {isLarge ? null : (
            <h4 className="widget-title text-primary">
              Interested in Studying {name} ?
            </h4>
          )}
          <form onSubmit={submitHandler} id="searchform" className="searchform">
            <Row>
              <CustomInput
                width={isLarge ? 6 : undefined}
                id="first_name"
                onChange={({ target: { id, value } }) => onChange(id, value)}
                value={formData?.first_name}
                label="First Name"
                required
              />
              <CustomInput
                width={isLarge ? 6 : undefined}
                id="last_name"
                onChange={({ target: { id, value } }) => onChange(id, value)}
                value={formData?.last_name}
                label="Last Name"
                required
              />
              <CustomInput
                width={isLarge ? 6 : undefined}
                id="email"
                onChange={({ target: { id, value } }) => onChange(id, value)}
                value={formData?.email}
                label="Email"
                type="email"
                required
              />

              <Col md={isLarge ? 6 : 12} lg={isLarge ? 6 : 12} sm={12}>
                <div className="form-group position-relative">
                  <label htmlFor="phone">Phone:</label>
                  <div
                    className="d-flex course-enquery-flag"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <FlagSelect
                      onChange={(val) => onChange("country_code", val)}
                      defaultValue={formData?.country_code}
                    />

                    <Input
                      className="form-control mr-1"
                      id="phone"
                      required
                      type="number"
                      onChange={({ target: { id, value } }) =>
                        onChange(id, value)
                      }
                      value={formData?.phone}
                      placeholder="Phone Number"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </Col>

              <input
                type="hidden"
                id="country_code"
                value={formData?.country_code}
              />

              <SelectInput
                width={6}
                onChange={onChange}
                id="country"
                label="Country"
                value={formData?.country}
                options={dropDownData?.countries?.map(({ name }) => ({
                  key: name,
                  value: name
                }))}
                required
              />
              <CustomInput
                id="city"
                label="City"
                width={6}
                required
                onChange={({ target: { value } }) => onChange("city", value)}
                value={formData?.city}
              />

              <Col md={12}>
                <div className="form-group position-relative">
                  <label> Message :</label>
                  <textarea
                    id="message"
                    placeholder="Message"
                    className="form-control"
                    required
                  />
                </div>
              </Col>
              <CollapsableWrapper title="Educational Details">
                <SelectInput
                  onChange={onChange}
                  id="degree_level"
                  label="Degree Level"
                  value={formData?.degree_level}
                  options={dropDownData?.degreeLevels?.map(({ id, name }) => ({
                    key: id,
                    value: name
                  }))}
                />
                <SelectInput
                  onChange={onChange}
                  id="category"
                  label="Course Category"
                  value={formData?.category}
                  options={dropDownData?.categories?.map(({ id, name }) => ({
                    key: id,
                    value: name
                  }))}
                />

                <Row style={{ margin: "0px" }}>
                  <CustomInput
                    id="academic_score"
                    label="Academic Score"
                    width={6}
                    onChange={({ target: { id, value } }) =>
                      onChange(id, value)
                    }
                    value={formData?.academic_score}
                  />
                  <SelectInput
                    width={6}
                    onChange={onChange}
                    id="score_type"
                    label="Score Type"
                    value={formData?.score_type}
                    options={[
                      { key: 0, value: "Percentage" },
                      { key: 1, value: "GPA" }
                    ]}
                  />
                </Row>
                <Row style={{ margin: "0px" }}>
                  <SelectInput
                    width={6}
                    onChange={onChange}
                    id="english_test"
                    label="English Test"
                    value={formData?.english_test}
                    options={englishTests}
                  />
                  <CustomInput
                    id="overall_score"
                    label="Overall Score"
                    width={6}
                    onChange={({ target: { id, value } }) =>
                      onChange(id, value)
                    }
                    value={formData?.overall_score}
                  />
                </Row>
              </CollapsableWrapper>
              <CollapsableWrapper title="Other Details">
                <SelectInput
                  width={12}
                  onChange={onChange}
                  id="nationality"
                  label="Nationality"
                  value={formData?.nationality}
                  options={dropDownData?.countries?.map(({ name }) => ({
                    key: name,
                    value: name
                  }))}
                />
                <Row style={{ margin: "0px" }}>
                  <SelectInput
                    width={6}
                    onChange={onChange}
                    id="preferred_country"
                    label="Preferred Country"
                    value={formData?.preferred_country}
                    options={dropDownData?.countries?.map(({ name }) => ({
                      key: name,
                      value: name
                    }))}
                  />
                  <SelectInput
                    width={6}
                    onChange={onChange}
                    id="preferred_intake"
                    label="Preferred Intake"
                    value={formData?.preferred_intake}
                    options={
                      dropDownData?.intakes?.map(({ id, month }) => ({
                        key: id,
                        value: month
                      })) || [
                        { key: 2021, value: 2021 },
                        { key: 2022, value: 2022 },
                        { key: 2023, value: 2023 },
                        { key: 2024, value: 2024 },
                        { key: 2025, value: 2025 }
                      ]
                    }
                  />
                </Row>
              </CollapsableWrapper>
              <Col md={12}>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="termsnconditions"
                      required
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="termsnconditions"
                    >
                      I Accept &nbsp;
                      <Link href="/information/terms" target="_blank" prefetch={false}>
                        <a className="text-primary">Terms And Condition</a>
                      </Link>
                    </label>
                  </div>
                </div>
              </Col>
              {/**<ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                onChange={(value) => onChange("gcaptcha", value)}
              />**/}
              <Col md={12} className="mt-4">
                <div className="send">
                  <button
                    type="submit"
                    /*disabled={(!!formData?.gcaptcha ? false : true) || loading}*/
                    onclick="return gtag_report_conversion('https://studyinfocentre.com/ask')"
                    className="btn btn-primary w-100"
                  >
                    Send Message &nbsp;
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : null}
                  </button>
                </div>
              </Col>
            </Row>
            <input type="hidden" id="course_id" value={course} />
            <input type="hidden" id="institute_id" value={institute} />
          </form>
        </div>
      </div>
    </Col>
  );
};
export default CourseEnquiryForm;

const CustomInput = ({ id, label, width = 12, wrapperStyle, ...rest }) => (
  <Col md={width} style={wrapperStyle}>
    <div className="form-group position-relative">
      <label htmlFor={id} style={{ color: label ? "" : "transparent" }}>
        {label}:
      </label>
      <Input
        className="form-control"
        id={id}
        autoComplete="off"
        {...rest}
        placeholder={rest?.placeholder || label}
      />
    </div>
  </Col>
);

const CollapsableWrapper = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="col-md-12" style={{ padding: "0px" }}>
      <a
        href="#!"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`faq position-relative text-${
          isCollapsed ? "primary" : "dark"
        }
         `}
      >
        <div className="card-header mb-4">
          <h4 className="widget-title text-primary">{title}</h4>
        </div>
      </a>
      <Collapse isOpen={!isCollapsed}>
        <div className="card-body" style={{ padding: "unset" }}>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export const SelectInput = ({
  id,
  label,
  options = [],
  width = 12,
  value = undefined,
  required,
  onChange,
  ...rest
}) => (
  <div className={`col-md-${width}`}>
    <div className="form-group position-relative">
      <label htmlFor={id}>{label}:</label>
      <input id={id} value={value} type="hidden" required={required} />
      <Select
        id={`${id}-unusedId`}
        size="large"
        showSearch
        allowClear
        placeholder={label}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.props?.children
            ?.toLowerCase()
            ?.indexOf(input.toLowerCase()) >= 0
        }
        value={value}
        autoComplete="off"
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
          border: "1px solid #cfcfcf"
        }}
        onChange={(value) => onChange(id, value)}
        {...rest}
      >
        {!!options?.length
          ? options?.map(({ key, value }) => (
              <Select.Option key={`dropdown-${id}-${key}-${value}`} value={key}>
                {value}
              </Select.Option>
            ))
          : null}
      </Select>
    </div>
  </div>
);

export const FlagSelect = ({
  width = 6,
  onChange,
  placeholder = "Country Code",
  defaultValue
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const inputField = useRef();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userIpDetail"));
    setValue(countryCodes[userData?.countryCode]);
  }, []);

  return (
    <div
      className={`d-flex col-lg-6 p-0 justify-content-${
        !!value ? "between" : "start"
      } align-items-center`}
    >
      {!!value ? (
        <img
          loading="lazy"
          src={`/images/flags/${value?.alpha2Code?.toLowerCase()}.svg`}
          alt={value?.alpha2Code}
          height="20"
          width="20"
          className="ml-1 col-lg-2 p-0"
        />
      ) : null}{" "}
      <ChevronDown
        className="mr-0"
        onClick={(_) => inputField.current.focus()}
      />
      <Input
        className={`form-control ml-1 p-0 col-lg-${width}`}
        style={{ border: "none" }}
        ref={inputField}
        wrapperStyle={{ display: "grid" }}
        // onChange={() => {}}
        value={!!value ? value?.callingCodes : undefined}
        onFocus={(_) => setIsVisible(true)}
        onBlur={(_) => setTimeout((_) => setIsVisible(false), 500)}
        placeholder={placeholder}
      />
      {isVisible ? (
        <div
          className="ant-select-dropdown mr-2"
          style={{
            minWidth: 200,
            width: 200,
            left: 0,
            top: 50,
            maxHeight: 256,
            overflowY: "auto",
            overflowAnchor: "none"
          }}
        >
          {Object.keys(countryCodes)?.map((key) => (
            <div
              onClick={(_) => {
                onChange(countryCodes[key]?.callingCodes);
                setValue(countryCodes[key]);
                setIsVisible(false);
              }}
              role="button"
              key={key}
              className="ant-select-item ant-select-item-option custom-input"
            >
              <div className="ant-select-item-option-content">
                <img
                  loading="lazy"
                  src={`/images/flags/${key?.toLowerCase()}.svg`}
                  alt={key}
                  height="20"
                  width="20"
                />
                &nbsp;
                {countryCodes[key]?.callingCodes}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
