import React from "react";
import Link from "next/link";
import { Row, Col } from "reactstrap";

import CourseEnquiryForm from "src/pages/CourseDetail/CourseEnquiryForm";
import Head from "next/head";
import useWidth from "src/utilities/widthUtil";

const AskQuestion = (_) => {
  const { isTablet, isMobile } = useWidth();

  return (
    <React.Fragment>
      <Head>
        <title>Ask us a question || Study Info Centre</title>
        <meta name='title' content='Ask us a question || Study Info Centre' />
        <script
          dangerouslySetInnerHTML={{
            __html: `function gtag_report_conversion(url)
        { var callback = function () { if (typeof(url) != 'undefined') 
        { window.location = url; } }; gtag('event', 'conversion',
        { 'send_to': 'AW-481259194/cpP6COTEgNECELrdveUB', 'event_callback': callback });
        return false; }`,
          }}
        />
      </Head>
      <section className='bg-half bg-light ask-question-wrapper'>
        <div className='home-center'>
          <div className='home-desc-center'>
            <div className='container'>
              <Row className='justify-content-center'>
                <Col lg={12} className='text-center'>
                  <div className='page-next-level'>
                    {/*   <h4 className="title"> Ask Question </h4> */}
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
                          Ask Question
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
          <Row className='justify-content-center'>
            <Col md={8} sm={8}>
              <div className='col m-2 bg-primary ask-question-bg'>
                <h5 className='text-white ml-2'>Have Question?</h5>
                {isMobile || isTablet ? (
                  <div className={`text-white mx-2 ${isTablet ? "mx-2" : ""}`}>
                    Get free and detailed counseling from experts on your study
                    journey.
                  </div>
                ) : (
                  <h2 className='text-white mx-2'>
                    Get free and detailed counseling from experts on your study
                    journey.
                  </h2>
                )}
              </div>
              <CourseEnquiryForm isLarge />
            </Col>
          </Row>
        </div>
      </section>
    </React.Fragment>
  );
};

export const InputField = ({
  width = 6,
  label,
  required,
  icon,
  id,
  ...rest
}) => (
  <Col md={width}>
    <div className="form-group position-relative">
      <label htmlFor={id}>
        {label}:{required ? <span className="text-danger">*</span> : ""}
      </label>
      {icon}
      <input
        id={id}
        className="form-control pl-5"
        placeholder={`${label}:`}
        required={required}
        {...rest}
      />
    </div>
  </Col>
);

export default AskQuestion;
