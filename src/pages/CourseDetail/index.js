import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import useWidth from "src/utilities/widthUtil";
import APIServices from "src/apiUtils/APIServices";

import Course from "./Course";
import CourseMatch from "./coursematch";
import CourseOverview from "./CourseOverview";
import CourseQuickFact from "./CourseQuickFact";
import AddressContainer from "./AddressContainer";
import CourseEnquiryForm from "./CourseEnquiryForm";
import UniversityInformation from "./UniversityInformation";

import CourseRecommand from "./CourseRecommand";
import getDurationType from "src/utilities/durationUtil";

import Advertisement from "src/components/ads/Advertisement";
import { GenericSkeleton } from "src/pages/Blog/Detail";
import { Tooltip } from "antd";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
// import { Helmet } from "react-helmet";

const CourseDetail = ({ data }) => {
  const history = useRouter();
  const [showInqueryForm, setShowInqueryForm] = useState(false);

  useEffect(() => {
    !history.isFallback && fetchExtraDetail();
    setTimeout(() => setShowInqueryForm(true), 40000);
  }, []);

  const fetchExtraDetail = async (_) => {
    const { country } = JSON.parse(
      window.localStorage?.getItem("userIpDetail") || "{}"
    );
    const { address = [] } = data || {};
    const studentVisaResponse = await new APIServices(
      `student-visa/?user_country=${country}&country=${address[0]?.country_name}`
    ).get();
    if (studentVisaResponse?.success)
      setStudentVisa(studentVisaResponse?.data?.data);
  };

  const [studentVisa, setStudentVisa] = useState();

  const { institute, address = [], intake = [], course_fee = [], ads = [] } =
    data || {};

  const { isTablet, isMobile } = useWidth();
  const schemas = !!data
    ? `{"@context": "https://schema.org/","@type": "Course","name": "${data?.name}","description": "${data?.meta_description}","provider": {"@type": "Organization","name": "${data?.institute?.name}"}}`
    : `{}`;
  const breadCrumb = !!data
    ? `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "/",
              "name": "Home"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "/course-detail/${data?.slug}",
              "name": "${data?.name}"
            }
          }
        ]
      }`
    : `{}`;
  return (
    <GenericSkeleton
      isActive={history.isFallback}
      bgClass='course-detail-container'
    >
      <React.Fragment>
        <Head>
          <title>{data?.meta_title}</title>
          <meta
            name='title'
            content={`${data?.name} | ${data?.institute?.name}`}
          />
          {data?.meta_description ? (
            <meta name='description' content={data?.meta_description} />
          ) : null}
          {data?.meta_keywords ? (
            <meta name='keywords' content={data?.meta_keywords} />
          ) : null}

          <meta property='og:image' content={data?.institute?.logo} />
          <meta property='og:image:width' content='180' />
          <meta property='og:image:height' content='110' />
          <meta name='twitter:card' content={data?.meta_keywords} />
          <meta
            name='twitter:url'
            content={`${process.env.NEXT_PUBLIC_SITE_URL}/course-detail/${data?.institute?.slug}/${data?.slug}`}
          />
          <meta name='twitter:title' content={data?.meta_title} />
          <meta name='twitter:description' content={data?.meta_description} />
          <meta name='twitter:image' content={data?.institute?.logo} />
          <script
            dangerouslySetInnerHTML={{
              __html: `function gtag_report_conversion(url)
        { var callback = function () { if (typeof(url) != 'undefined') 
        { window.location = url; } }; gtag('event', 'conversion',
        { 'send_to': 'AW-481259194/cpP6COTEgNECELrdveUB', 'event_callback': callback });
        return false; }`,
            }}
          />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: schemas }}
          />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: breadCrumb }}
          />
        </Head>

        <section className='bg-half bg-light course-detail-container'>
          <div className='home-center'>
            <div className='home-desc-center'>
              <div className='container'>
                <Row className='justify-content-center'>
                  <Col lg={12} className='text-center'>
                    <div
                      className={`page-next-level course-detail title-wrapper ${
                        isMobile
                          ? "page-next-level mt-4 bg-white p-1 shadow rounded"
                          : ""
                      }`}
                    >
                      <h1
                        className={`text-primary ${
                          isMobile ? "course-detail-title" : ""
                        }`}
                      >
                        {data?.name}
                      </h1>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
        {showInqueryForm ? (
          <span
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "#0c0b0b80",
              zIndex: 1400,
              padding: isTablet || isMobile ? "0" : "5% 30%",
              overflow: "scroll",
            }}
          >
            <div className='bg-light rounded p-4'>
              <button
                className='d-block pull-right close'
                style={{ fontSize: "50px", margin: "-1.5rem -1rem" }}
                onClick={() => setShowInqueryForm(false)}
              >
                <CloseOutlined className='close mt-2' />
              </button>
              <CourseEnquiryForm
                name={data?.name}
                institute={institute?.id}
                course={data?.id}
                country={address[0]?.country_name}
                intake={intake[0]?.month}
              />
            </div>
          </span>
        ) : null}

        <CourseQuickFact
          duration={
            data?.duration
              ? data?.duration + " " + getDurationType(data?.per_duration)
              : isMobile
              ? ""
              : "N/A"
          }
          fee={!!course_fee && course_fee[0]?.international}
          currency={!!course_fee && course_fee[0]?.currency__name}
          apply_date={
            intake
              ?.filter(({ apply_month }) => !!apply_month)
              ?.map(({ apply_month }) => apply_month)
              ?.join("/") || isMobile
              ? ""
              : "N/A"
          }
          start_date={
            intake?.length ? (
              <Tooltip
                title={intake?.map(({ month }) => month)?.join(" /")}
                color='#1C599F'
              >
                {intake
                  ?.map(({ month }) => month)
                  ?.slice(0, 2)
                  ?.join("/")}
                {intake?.length > 2 ? `(+${intake?.length - 2})` : ""}
              </Tooltip>
            ) : isMobile ? (
              ""
            ) : (
              "N/A"
            )
          }
          feeDuration={getDurationType(course_fee[0]?.per_fee)}
          isMobile={isMobile}
        />
        <section className='section'>
          <div className='container'>
            {/* <Row className="justify-content-center">
              <CourseMatch {...data} />
            </Row> */}
            <Row>
              <Col lg={8} md={12} sm={12} className='p-0'>
                <Col lg={12} md={12}>
                  <div className='mr-lg-3'>
                    <div className=' overflow-hidden shadow rounded'>
                      <Course {...data} />
                    </div>
                  </div>
                </Col>
                {/* {isMobile || isTablet ? (
                  <UniversityInformation {...data} />
                ) : null} */}

                <Advertisement
                  type={ads[0]?.dimension_type}
                  image={ads[0]?.image}
                  url={ads[0]?.url}
                  wrapperClass='mt-4'
                />
                <Col lg={12} md={12} className='mb-3'>
                  <CourseOverview
                    {...data}
                    address={address}
                    student_visa={studentVisa}
                  />
                  {!!data?.study_mode &&
                  address?.filter(
                    ({ longitude, latitude }) =>
                      longitude !== null && latitude !== null
                  )?.length ? (
                    <div className='mr-lg-3 mt-4 pt-2 p-lg-4 shadow rounded'>
                      <h4 className='page-title text-primary'>Address</h4>
                      <AddressContainer
                        addresses={address.filter(
                          ({ longitude, latitude }) =>
                            longitude !== null && latitude !== null
                        )}
                      />
                    </div>
                  ) : null}
                </Col>
              </Col>
              <Col lg={4} md={12} sm={12}>
                {/* {isMobile || isTablet ? null : ( */}
                <UniversityInformation {...data} />
                {/* )} */}
                <Advertisement
                  type={ads[1]?.dimension_type}
                  image={ads[1]?.image}
                  url={ads[1]?.url}
                  wrapperClass='mt-4'
                />
                <CourseEnquiryForm
                  name={data?.name}
                  institute={institute?.id}
                  course={data?.id}
                  country={address[0]?.country_name}
                  intake={intake[0]?.month}
                />
              </Col>
            </Row>
          </div>
        </section>
        <section className='section bg-light'>
          <div className='container'>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <div className={`mr-lg-3 ${isMobile ? "" : "p-4"}`}>
                  <CourseRecommand
                    category={data?.category_name}
                    degree_level={data?.degree_level_name}
                    course_id={data?.id}
                    name={data?.name}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </React.Fragment>
    </GenericSkeleton>
  );
};

export default CourseDetail;
