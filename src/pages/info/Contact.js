import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col } from "reactstrap";
import { PhoneCall, Mail } from "react-feather";
//import ReCAPTCHA from "react-google-recaptcha";
import { Divider, notification, Empty, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "src/actions/userActions";
import { InputField } from "src/pages/info/AskQuestion";
import APIServices from "src/apiUtils/APIServices";
import {
  FlagSelect,
  SelectInput
} from "src/pages/CourseDetail/CourseEnquiryForm";
import countries from "public/countries";
import Head from "next/head";
import useWidth from "src/utilities/widthUtil";

const Contact = (_) => {
  const dispatch = useDispatch();

  const addresses = useSelector((state) => state.user.get("contactUs"));
  const { isTablet, isMobile } = useWidth();

  useEffect(() => {
    !addresses?.length && dispatch(fetchAddresses());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Contact Us | Study Info Centre</title>
        <meta name='title' content='Contact Us | Study Info Centre' />
      </Head>
      <section className='bg-half bg-light contact-us-wrapper'>
        <div className='home-center'>
          <div className='home-desc-center'>
            <div className='container'>
              <Row className='justify-content-center'>
                <Col lg={12} className='text-center'>
                  <div className='page-next-level'>
                    {/*   <h2 className="title"> Contact Us </h2> */}
                    <ul className='page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0'>
                      <li>
                        <Link href='/'>
                          <a className='text-uppercase font-weight-bold text-dark'>
                            Home
                          </a>
                        </Link>
                      </li>
                      <li>
                        <span className='text-uppercase text-primary font-weight-bold'>
                          Contact
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

      <section className='section'>
        <div className='container'>
          <Row className='contact-us-row'>
            {isMobile || isTablet ? (
              <Col lg={8} md={12} sm={12} className='pl-md-3 pr-md-3 mb-4 pt-2'>
                <div className='pt-5 p-4 bg-white rounded shadow text-muted'>
                  <h4 className='text-dark'>Worldwide Office:</h4>
                  {addresses?.length ? (
                    <Row>
                      {addresses?.map((address, idx) => (
                        <>
                          <AddressCard {...address} />
                          {idx % 2 === 1 ? <Divider /> : ""}
                        </>
                      ))}
                    </Row>
                  ) : (
                    <Empty />
                  )}
                </div>
              </Col>
            ) : (
              ""
            )}
            <div className=' col-12 button-group text-center'>
              <Link href='/ask'>
                <a
                  className={`btn btn-primary m-3 col-lg-2 ${
                    (isMobile || isTablet) && "contact-us-buttons"
                  }`}
                >
                  Student
                </a>
              </Link>
              <Link href='/institutions'>
                <a
                  className={`btn btn-primary m-3 col-lg-2 ${
                    (isMobile || isTablet) && "contact-us-buttons"
                  }`}
                >
                  Institutions
                </a>
              </Link>
              <Link href='/recruitment-partners'>
                <a
                  className={`btn btn-primary m-3 col-lg-2 ${
                    (isMobile || isTablet) && "contact-us-buttons"
                  }`}
                >
                  Recruitment Partners
                </a>
              </Link>
            </div>
            <GetInTouchForm />
            {isMobile || isTablet ? (
              ""
            ) : (
              <Col lg={8} md={12} sm={12} className='pl-md-3 pr-md-3 mt-4 pt-2'>
                <div className='pt-5 p-4 bg-white rounded shadow text-muted'>
                  <h4 className='text-dark'>Worldwide Office:</h4>
                  {addresses?.length ? (
                    <Row>
                      {addresses?.map((address, idx) => (
                        <>
                          <AddressCard {...address} />
                          {idx % 2 === 1 ? <Divider /> : ""}
                        </>
                      ))}
                    </Row>
                  ) : (
                    <Empty />
                  )}
                </div>
              </Col>
            )}
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;

const AddressCard = ({
  country,
  street,
  city,
  state,
  postal_code,
  phone_number,
  email
}) => (
  <Col md={4} sm={6} className="m-2">
    <strong>{country} Office&nbsp;</strong>
    {street}
    <br />
    {`${city}, ${state} ${postal_code}`}
    {!!phone_number ? (
      <>
        <br />
        <PhoneCall size={15} />
        &nbsp;
        <a href={`tel:${phone_number}`}>{`${phone_number}`}</a>
      </>
    ) : null}
    {!!email ? (
      <>
        <br />
        <Mail size={15} />
        &nbsp;
        <a href={`mailto:${email}`}>{email}</a>
      </>
    ) : null}
    &nbsp;
  </Col>
);

export const GetInTouchForm = ({ title, isInstitution = undefined }) => {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState();
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id && !a.id.includes("unusedId")) {
          data[a.id] = a.value;
        }
      } else isValid = false;
    });
    if (!!isValid) sendInquery(data, form);
  };

  const sendInquery = async (formData, form) => {
    const { success } = await new APIServices("contact-us/").post(formData);
    if (success) {
      notification.success({
        message: "Contact details send successfully."
      });
      form.reset();
      window.scrollTo(0, 0);
    } else {
      notification.info({ message: "Could not send Inquery." });
    }
    setLoading(false);
  };

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem("userIpDetail"));
    setFormData({
      country: userData?.country,
      calling_code: userData?.countryCode
    });
  }, []);

  const onChange = (id, value) => setFormData({ ...formData, [id]: value });

  return (
    <Col lg={4} md={12} sm={12} className="mt-4 pt-2">
      <div className="pt-5 pb-5 p-4 bg-white rounded shadow">
        <h4>{!!title ? title : "Get in Touch!"}</h4>
        <div className="custom-form mt-4">
          <div id="message"></div>

          <form onSubmit={submitHandler} id="contact-form">
            <Row>
            {typeof isInstitution !== "undefined" && (  <InputField
                width={12}
                id="organization_name"
                label={
                  !!title && isInstitution ? "Institute Name" : "Company Name"
                }
                icon={<i className="mdi mdi-domain ml-3 icons" />}
                required
              /> )}

              {typeof isInstitution !== "undefined" ? !!title && isInstitution ? (
                <input type="hidden" id="organization_type" value="0" />
              ) : (
                <input type="hidden" id="organization_type" value="1" />
              ): (<input type="hidden" id="organization_type" value="2" />)}

              <InputField
                label="First Name"
                id="first_name"
                icon={<i className="mdi mdi-account ml-3 icons" />}
                required
              />
              <InputField
                label="Last Name"
                id="last_name"
                icon={<i className="mdi mdi-account ml-3 icons" />}
                required
              />
              <InputField
                width={12}
                id="email"
                label="Your Email"
                icon={<i className="mdi mdi-email ml-3 icons" />}
                type="email"
                required
              />
              {typeof isInstitution !== "undefined" && (
                <InputField
                  width={12}
                  id="job_title"
                  label="Job Title"
                  icon={<i className="mdi mdi-briefcase ml-3 icons" />}
                  required
                />
              )}
              {/* <SelectInput
                width={6}
                onChange={(id, value) => setOrganizationType(value)}
                id="organization_type"
                label="Organization Type"
                value={organizationType}
                options={[
                  { key: 0, value: "School/University" },
                  { key: 1, value: "Agency" }
                ]}
                required
              /> */}

              <Col md={12} lg={12} sm={12}>
                <div className="form-group position-relative">
                  <label htmlFor="phone">Phone:</label>
                  <div
                    className="d-flex course-enquery-flag"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <FlagSelect
                      onChange={(val) => onChange("calling_code", val)}
                      defaultValue={formData?.calling_code}
                    />

                    <Input
                      className="form-control"
                      id="phone_number"
                      required
                      type="number"
                      onChange={({ target: { id, value } }) =>
                        onChange(id, value)
                      }
                      value={formData?.phone_number}
                      placeholder="Phone Number"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </Col>

              <input
                type="hidden"
                id="calling_code"
                value={formData?.calling_code}
              />

              <SelectInput
                width={12}
                onChange={onChange}
                id="country"
                label={
                    typeof isInstitution === "undefined"
                    ? "Country"
                    : isInstitution
                    ? "Destination Country"
                    : "Main Source of Student"
                }
                value={formData?.country}
                options={Object.values(countries)?.map((name) => ({
                  key: name,
                  value: name
                }))}
                required
              />
              <Col md={12}>
                <div className="form-group position-relative">
                  <label htmlFor="message">
                    Message: <span className="text-danger">*</span>
                  </label>
                  <i className="mdi mdi-comment-text-outline ml-3 icons" />
                  <textarea
                    id="message"
                    rows="4"
                    className="form-control pl-5"
                    placeholder="Your Message :"
                    required
                  />
                </div>
              </Col>
              <Col sm={12} className="text-center">
                {/**<ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY}
                  onChange={(value) => onChange("gcaptcha", value)}
                />**/}

                <button
                  type="submit"
                  disabled={!!formData?.gcaptcha ? false : true && loading}
                  className="submitBnt btn btn-primary btn-block mt-3"
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
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </Col>
  );
};
