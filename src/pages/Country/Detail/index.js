//TODO: This code may need changes as per the requirements

import React, { useState, useEffect } from "react";

import CountryWrapper from "./CountryWrapper";
import City from "../City";

import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import Table from "reactstrap/lib/Table";
import { ordinal_suffix_of } from "src/utilities/NumberFormat";

import Empty from "antd/lib/empty";
import Advertisement from "src/components/ads/Advertisement";
import { GenericSkeleton } from "src/pages/Blog/Detail";

import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import CourseEnquiryForm from "src/pages/CourseDetail/CourseEnquiryForm";
import { ChevronsRight } from "react-feather";
import Head from "next/head";
// import { Helmet } from "react-helmet";

const CountryDetail = ({ data }) => {
  const history = useRouter();
  const [state, setState] = useState({
    activeTab: "",
    activeTab1: "education",
  });

  useEffect(() => {
    setState({ ...state, activeTab: data?.cities[0]?.name });
  }, []);

  const { cities = [], institutes = [], ads = [] } = data || {};

  const toggle = (tab) => {
    setState({ ...state, activeTab1: tab });
  };

  const toggleCity = (tab) => {
    setState({ ...state, activeTab: tab });
  };

  const schemas = !!data
    ? `{"@context": "https://schema.org/","@type":"Article","name":"${data?.name}","description": "${data?.meta_description}","author": "Study Info Centre","datePublished":"2020/10/01","headline": "${data?.name}","image": "${data?.image}","mainEntityOfPage": "${data?.meta_description}","publisher": {"@type": "Organization","name":  "Study Info Centre","logo": {"@type": "ImageObject","url": "${process.env.NEXT_PUBLIC_SITE_URL}/studyinfo.png"}}}`
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
          "@id": "/country-list",
          "name": "Country Lists"
        }
      },{
        "@type":"ListItem",
        "position":3,
        "item":{
          "@id":"/country-detail/${data?.slug}",
          "name":"${data?.name}"
        }
      }
    ]
  }`
    : `{}`;

  return (
    <GenericSkeleton isActive={history.isFallback}>
      <React.Fragment>
        <Head>
          <title>{data?.meta_title}</title>
          {/* {data?.meta_description ? ( */}
          <meta name='description' content={data?.meta_description} />
          {/* ) : null} */}
          {/* {data?.meta_keywords ? ( */}
          <meta name='keywords' content={data?.meta_keywords} />
          {/* ) : null} */}

          <meta property='og:image' content={data?.image} />
          <meta property='og:image:width' content='180' />
          <meta property='og:image:height' content='110' />
          <meta name='twitter:card' content={data?.meta_keywords} />
          <meta
            name='twitter:url'
            content={`${process.env.NEXT_PUBLIC_SITE_URL}/country-detail/${data?.slug}`}
          />
          <meta name='twitter:title' content={data?.meta_title} />
          <meta name='twitter:description' content={data?.meta_description} />
          <meta name='twitter:image' content={data?.image} />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: schemas }}
          />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: breadCrumb }}
          />
        </Head>
        <section className='bg-half bg-light blog-detail-wrapper'>
          <div className='home-center'>
            <div className='home-desc-center'>
              <div className='container'>
                <Row className='justify-content-center'>
                  <Col lg={12} className='text-center sm-p-0'>
                    <div className='page-next-level'>
                      <div className='mt-4 d-lg-none d-md-none'>
                        <h5 className='title'>{data?.name}</h5>
                      </div>
                      <h1 className='title d-none d-lg-block d-md-block'>
                        {data?.name}
                      </h1>
                      <ul className='list-unstyled mt-4'></ul>
                      <ul className='page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0'>
                        <li>
                          <Link href='/'>
                            <a className='text-uppercase font-weight-bold text-dark'>
                              Home
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href='/country-list'>
                            <a className='text-uppercase font-weight-bold text-dark'>
                              Country
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`/country-detail/${data?.slug}`}
                            prefetch={false}
                          >
                            <a className='text-uppercase font-weight-bold text-primary'>
                              {data?.name}
                            </a>
                          </Link>
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
            <Row>
              <Col lg={8} md={7}>
                <Col lg={12} md={12} className='sm-p-0'>
                  <div className='sm-no-shadow overflow-hidden shadow rounded'>
                    <CountryWrapper {...data} />
                  </div>
                </Col>

                <Advertisement
                  type={ads[0]?.dimension_type}
                  image={ads[0]?.image}
                  url={ads[0]?.url}
                  wrapperClass='mt-4'
                />
                <Col lg={12} md={12} className='sm-p-0'>
                  <div className='sm-no-shadow overflow-hidden mt-4 pt-4 shadow rounded'>
                    <Nav
                      pills
                      className='nav-justified flex-column flex-sm-row justify-content-center d-flex col-lg-8'
                      style={{ width: "100%", margin: "auto" }}
                    >
                      <NavItem>
                        <a
                          onClick={() => {
                            toggle("education");
                          }}
                          href='#!'
                          className={`${
                            state.activeTab1 === "education" ? "active " : ""
                          } nav-link`}
                        >
                          <div className='text-center pt-1 pb-1'>
                            <h4
                              className={`title font-weight-normal mb-0 ${
                                state.activeTab1 === "education"
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Education
                            </h4>
                          </div>
                        </a>
                      </NavItem>
                      <NavItem>
                        <a
                          className={`${
                            state.activeTab1 === "Work Permit" ? "active" : ""
                          } nav-link`}
                          onClick={() => {
                            toggle("Work Permit");
                          }}
                          href='#!'
                        >
                          <div className='text-center pt-1 pb-1'>
                            <h4
                              className={`title font-weight-normal mb-0 ${
                                state.activeTab1 === "Work Permit"
                                  ? "text-white"
                                  : ""
                              }`}
                            >
                              Work Permit
                            </h4>
                          </div>
                        </a>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={state.activeTab1}>
                      <TabPane tabId='education' className='p-3 sm-p-0'>
                        <div
                          className='container '
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{
                            __html: data?.education,
                          }}
                        />
                      </TabPane>
                      <TabPane tabId='Work Permit' className='p-3 sm-p-0'>
                        <div
                          className='container'
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{
                            __html: data?.work_permit,
                          }}
                        />
                      </TabPane>
                    </TabContent>
                  </div>

                  <Advertisement
                    type={ads[1]?.dimension_type}
                    image={ads[1]?.image}
                    url={ads[1]?.url}
                  />

                  <div className='sm-no-shadow sm-p-0 mt-4 pt-2 p-4 shadow rounded'>
                    <div className='widget border-bottom p-3'>
                      <h5 className='mb-0 text-primary'>City</h5>
                    </div>
                    {cities?.length ? (
                      <>
                        <Nav
                          pills
                          className='nav-justified flex-column flex-sm-row'
                        >
                          {cities?.map(({ name }) => (
                            <NavItem key={name}>
                              <a
                                onClick={() => {
                                  toggleCity(name);
                                }}
                                href='#!'
                                className={`${
                                  state.activeTab === name ? "active" : ""
                                } nav-link`}
                              >
                                <div className='text-center pt-1 pb-1'>
                                  <h4
                                    className={`title font-weight-normal mb-0 ${
                                      state.activeTab === name
                                        ? "text-white"
                                        : ""
                                    }`}
                                  >
                                    {name}
                                  </h4>
                                </div>
                              </a>
                            </NavItem>
                          ))}
                        </Nav>

                        <TabContent activeTab={state.activeTab}>
                          {cities?.map((city, idx) => (
                            <TabPane
                              tabId={city.name}
                              className='sm-no-shadow p-3 sm-p-0'
                              key={`city-${idx}`}
                            >
                              <p className='text-muted mb-0'>
                                <City {...city} />
                              </p>
                            </TabPane>
                          ))}
                        </TabContent>
                      </>
                    ) : (
                      <Empty />
                    )}
                  </div>

                  <InstitutesTable institutes={institutes} />
                </Col>
              </Col>
              <Col lg={4} md={5} className='sm-p-0'>
                {/* <CountryInformation {...data} /> */}
                <Advertisement
                  type={ads[2]?.dimension_type}
                  image={ads[2]?.image}
                  url={ads[2]?.url}
                  wrapperClass='mt-4'
                />
                <CourseEnquiryForm country={data?.name} name={data?.name} />
              </Col>
            </Row>
          </div>
        </section>
      </React.Fragment>
    </GenericSkeleton>
  );
};

export default CountryDetail;

const InstitutesTable = ({ institutes }) => {
  const [current, setCurrent] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const handleSlide = (_) => {
    const tbl = document.getElementsByClassName("table-responsive");
    if (tbl.length) {
      tbl[0].scroll({ left: "400", behavior: "smooth" });
    }
  };
  return (
    <div className='mt-4 pt-2 p-4 sm-p-0 sm-no-shadow component-wrapper rounded shadow'>
      <div className='p-4 border-bottom sm-p-0'>
        <h4 className='title mb-0'> Institute </h4>
      </div>
      {institutes?.length ? (
        <div className='p-4 sm-p-0'>
          <div className='table-responsive bg-white shadow rounded'>
            <span className='col-12 d-flex justify-content-end'>
              <div className='d-lg-none d-md-none'>
                <ChevronsRight onClick={handleSlide} />
              </div>
            </span>
            <Table className='mb-0 table-center'>
              <thead>
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope='col'>Institute</th>
                  <th scope='col'>Location</th>
                  <th scope='col'>Rank</th>
                </tr>
              </thead>
              <tbody>
                {institutes
                  ?.slice(current * perPage, (current + 1) * perPage)
                  ?.map((institute, idx) => (
                    <tr key={`institute-kwzfvxc-${idx}`}>
                      {/* <th scope="row">{idx + 1}</th> */}
                      <td>
                        <Link
                          href={`/institute-detail/${institute?.slug}`}
                          prefetch={false}
                        >
                          <a>{institute.name}</a>
                        </Link>
                      </td>
                      <td>
                        {institute.address?.map((e, addressIdx) => (
                          <span key={`adress-${addressIdx}`}>
                            {e.suburb
                              ? `${e.suburb}, ${e.state}, ${e.country}`
                              : `${e.city}, ${e.state}, ${e.country}`}
                            <br />
                          </span>
                        ))}
                      </td>
                      <td>
                        {institute.rank &&
                        institute.rank_by &&
                        institute.rank_year
                          ? `${ordinal_suffix_of(institute.rank)} by
                                 ${institute.rank_by} in ${institute.rank_year}`
                          : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>

              <tfoot>
                <span className='col-3'>
                  Per page:
                  <select onChange={(e) => setPerPage(e.target.value)}>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                  </select>
                </span>
                <Pagination
                  totalPage={(institutes?.length / 10).toFixed(0)}
                  onSelect={(a) => setCurrent(a)}
                  current={current}
                />
              </tfoot>
            </Table>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

const Pagination = ({ totalPage, onSelect, current }) => (
  <nav className="pl-4 mt-4">
    <ul class="pagination">
      <li class="page-item">
        <span
          class="page-link"
          onClick={(_) => onSelect(current > 0 ? current - 1 : 0)}
        >
          Previous
        </span>
      </li>

      {Array(Number(totalPage))
        .fill(1)
        ?.map((_, idx) => (
          <li class="page-item" key={idx} role="button">
            <span
              class={`page-link ${current === idx  ? " active" : ""}`}
              onClick={(_) => onSelect(idx)}
              style={
                current === idx
                  ? {
                      backgroundColor: "#e9ecef",
                      borderColor: "#dee2e6"
                    }
                  : {}
              }
            >
              {idx + 1}
            </span>
          </li>
        ))}
      <li class="page-item">
        <span
          class="page-link"
          onClick={(_) =>
            onSelect(current < totalPage ? current + 1 : totalPage)
          }
        >
          Next
        </span>
      </li>
    </ul>
  </nav>
);
