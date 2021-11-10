import React, { useState, useEffect } from "react";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import APIServices from "src/apiUtils/APIServices";
import { ordinal_suffix_of } from "src/utilities/NumberFormat";

import University from "./UniversityDetail";
import DegreeWrapper from "./DegreeWrapper";
import AddressContainer from "src/pages/CourseDetail/AddressContainer";
import CourseEnquiryForm from "src/pages/CourseDetail/CourseEnquiryForm";

import useWidth from "src/utilities/widthUtil";
import { InfoWidget } from "src/pages/CourseDetail/UniversityInformation";

import Advertisement from "src/components/ads/Advertisement";
import { GenericSkeleton } from "src/pages/Blog/Detail";
import FeatureInstitute from "src/pages/StudyInfoCentre/FeatureInstitute";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Head from "next/head";
// import { Helmet } from "react-helmet";
import { TabContent, TabPane, Nav, NavItem } from "reactstrap";
import UniversityVideo from "./UniversityVideo";

const Categroy = (props) => {
  const { course, data } = props;
  const history = useRouter();
  const { isMobile, isTablet, isLaptop } = useWidth();

  const {
    institute,
    address = [],
    degree_data = [],
    no_course = [],
    ads = [],
  } = data || {};
  const [state, setState] = useState({ active: "1" });
  const render_degrees = (_) =>
    degree_data?.map((data, idx) => (
      <div
        key={`degree-wrapper-${idx}`}
        className='overflow-hidden mt-4 shadow rounded'
      >
        <DegreeWrapper {...data} countrySlug={address[0]?.country__slug} />
      </div>
    ));
  const [featuredInstitute, setFeaturedInstitute] = useState();

  const fetchFeaturedUniversities = async () => {
    const { data, success } = await new APIServices(`feature-university`).get();
    if (success) setFeaturedInstitute(data?.data);
  };

  const schemas = `{"@context": "https://schema.org","@type": "CollegeOrUniversity", "name": "${institute?.name}"}`;

  const breadCrumb = `{
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
          "@id": "/institute-detail/${institute?.slug}",
          "name": "${institute?.name}"
        }
      }
    ]
  }`;

  useEffect(() => {
    !!address[0]?.country__name && fetchFeaturedUniversities();
  }, [history]);

  useEffect(() => {
    course
      ? setState({ ...state, active: "2" })
      : setState({ ...state, active: "1" });
  }, []);
  const toggle = (tab) => {
    if (state.active !== tab) {
      setState({ ...state, active: tab });
    }
  };
  return (
    <GenericSkeleton
      isActive={history.isFallback}
      bgClass='university-detail-wrapper'
    >
      <>
        <Head>
          <title>{institute?.meta_title}</title>
          {institute?.meta_description ? (
            <meta name='description' content={institute?.meta_description} />
          ) : null}
          {institute?.meta_keywords ? (
            <meta name='keywords' content={institute?.meta_keywords} />
          ) : null}
          {!!data ? (
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: schemas }}
            />
          ) : null}
          {!!data ? (
            <script
              type='application/ld+json'
              dangerouslySetInnerHTML={{ __html: breadCrumb }}
            />
          ) : null}
        </Head>
        <section className='bg-half bg-light university-detail-wrapper'>
          <div className='home-center'>
            <div className='home-desc-center'>
              <div className='container'>
                <Row className='justify-content-center'>
                  <Col lg={12} className='text-center'>
                    <div className='page-next-level'>
                      <h1
                        className='text-primary title'
                        // style={{ paddingTop: "2rem" }}
                        style={{ paddingTop: `${isMobile ? "1rem" : "0rem"}` }}
                      >
                        {institute?.name}
                      </h1>
                      <ul className='list-unstyled mt-4 sm-m-0'></ul>
                      {!isMobile && (
                        <ul className='page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0'>
                          <li>
                            <Link href='/'>
                              <a className='text-uppercase font-weight-bold text-dark'>
                                Home
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/country-detail/${address[0]?.country__slug}`}
                            >
                              <a className='text-uppercase font-weight-bold text-dark'>
                                {address[0]?.country__name}
                              </a>
                            </Link>
                          </li>
                          <li>
                            <span className='text-uppercase text-primary font-weight-bold'>
                              {institute?.name}
                            </span>
                          </li>
                        </ul>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>

        <section
          className='container university-detail-card'
          style={{
            paddingTop: `${isMobile ? "10px" : "40px"}`,
            paddingBottom: "30px",
          }}
        >
          {isMobile ? (
            <div className='shadow rounded p-1'>
              <Row>
                <Col sm={3} md={2} lg={2} className='text-center'>
                  {!!institute?.logo ? (
                    <img
                      loading='lazy'
                      src={institute?.logo}
                      alt={institute?.name}
                      // className='institute-image'
                      style={{
                        objectFit: "cover",
                        maxHeight: "100px",
                        maxWidth: "100px",
                      }}
                    />
                  ) : null}
                </Col>
                <Col
                  sm={9}
                  md={7}
                  lg={7}
                  className='text-center d-flex flex-column justify-content-center'
                >
                  <div className='text-primary text-center university-name-mobile'>
                    {institute?.name}
                  </div>
                  <div className='d-flex justify-content-center'>
                    <Row>
                      <Col md={12}>
                        {!!institute?.rank ? (
                          <div className=' text-dark mr-3 university-info-mobile'>
                            <i className='mdi mdi-chart-bell-curve mdi-22px' />{" "}
                            World Rank:{" "}
                            {`${ordinal_suffix_of(institute?.rank)} by ${
                              institute?.rank_by
                            }`}
                          </div>
                        ) : null}
                      </Col>{" "}
                      <Col md={12}>
                        {!!institute?.established_on ? (
                          <div className='text-dark mr-3 university-info-mobile'>
                            <i className='mdi mdi-calendar mdi-22px' />{" "}
                            Established on: {institute?.established_on}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col
                  sm={12}
                  md={3}
                  lg={3}
                  className='d-flex justify-content-center'
                >
                  <div
                    className='widget'
                    style={{
                      marginTop: "auto",
                      display: "block",
                      width: "fit-content",
                    }}
                  >
                    <a
                      href={institute?.url}
                      target='_blank'
                      className='visit-website-button-mobile'
                    >
                      Visit {institute?.institute_type} Website{" "}
                      <i className='mdi mdi-launch' />
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div className='shadow rounded p-1'>
              <Row>
                <Col
                  sm='12'
                  md='2'
                  lg='2'
                  className='d-flex align-items-center justify-content-center'
                >
                  {!!institute?.logo ? (
                    <img
                      loading='lazy'
                      src={institute?.logo}
                      alt={institute?.name}
                      // className='institute-image'
                      style={{
                        objectFit: "cover",
                        maxHeight: `${isTablet ? "60px" : "100px"}`,
                        maxWidth: `${isTablet ? "60px" : "100px"}`,
                      }}
                    />
                  ) : null}
                </Col>
                <Col
                  sm={12}
                  md={7}
                  lg={7}
                  className='text-center d-flex flex-column justify-content-center'
                >
                  <div className='text-primary text-center university-name'>
                    {institute?.name}
                  </div>

                  <div className='d-flex justify-content-center flex-wrap'>
                    <Row>
                      <Col md={12}>
                        {!!institute?.rank ? (
                          <div className='text-dark mr-3 university-info'>
                            <i className='mdi mdi-chart-bell-curve mdi-22px' />{" "}
                            World Rank:{" "}
                            {`${ordinal_suffix_of(institute?.rank)} by ${
                              institute?.rank_by
                            }`}
                          </div>
                        ) : null}
                      </Col>
                      <Col md={12}>
                        {!!institute?.established_on ? (
                          <div className='text-dark mr-3 university-info'>
                            <i className='mdi mdi-calendar mdi-22px' />{" "}
                            Established on: {institute?.established_on}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm={12} md={3} lg={3} className='d-flex'>
                  <div
                    className='widget'
                    style={{
                      marginTop: "auto",
                      display: "block",
                      width: "fit-content",
                    }}
                  >
                    <a
                      href={institute?.url}
                      target='_blank'
                      className='visit-website-button btn-primary'
                    >
                      Visit {institute?.institute_type} Website{" "}
                      <i className='mdi mdi-launch' />
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          <Nav
            pills
            className='nav-active-bordered-pill sticky mt-3 shadow bordered pb-3 bg-white '
            style={{ zIndex: 1 }}
          >
            <NavItem className='pl-4'>
              <Link
                href={{
                  pathname: `/institute-detail/${institute?.slug}`,
                }}
                prefetch={false}
              >
                <a
                  className={
                    state.active === "1" ? "active nav-link" : "nav-link"
                  }
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Overview
                </a>
              </Link>
            </NavItem>
            <NavItem className='pl-4'>
              <Link
                href={{
                  pathname: `/institute-detail/${institute?.slug}/course`,
                }}
                prefetch={false}
              >
                <a
                  className={
                    state.active === "2" ? "active nav-link" : "nav-link"
                  }
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Course
                </a>
              </Link>
            </NavItem>
          </Nav>
        </section>
        {!course ? <University data={props?.data} /> : ""}
      </>
    </GenericSkeleton>
  );
};

export default Categroy;

const UniversityInfo = ({
  institute_type,
  rank,
  rank_by,
  url,
  established_on,
}) => (
  <Col lg={12} md={12} className='col-12 mt-4 mt-sm-0 pt-2 pt-sm-0'>
    <div className='sidebar rounded shadow'>
      <div className='widget border-bottom p-4'>
        <h5 className='mb-0 text-primary'>{institute_type} Information</h5>
      </div>

      <div className='p-4'>
        {!!rank ? (
          <InfoWidget
            icon={
              <i className='mdi mdi-chart-bell-curve mdi-24px text-dark float-left mr-3'></i>
            }
            label='World Rank:'
            value={`${ordinal_suffix_of(rank)} by
              ${rank_by}`}
          />
        ) : null}
        {!!established_on ? (
          <InfoWidget
            icon={
              <i className='mdi mdi-calendar mdi-24px text-dark float-left mr-3'></i>
            }
            label='Established on:'
            value={established_on}
          />
        ) : null}

        <div
          className='widget'
          style={{ margin: "auto", display: "block", width: "fit-content" }}
        >
          <a href={url} target='_blank' className='btn btn-primary'>
            Visit {institute_type} Website
          </a>
        </div>
      </div>
    </div>
  </Col>
);
