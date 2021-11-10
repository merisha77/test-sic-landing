import React from "react";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

import SubCatgoryWrapper from "./SubCatgoryWrapper";
import CategoryWrapper from "./CategoryWrapper";

import CourseRecommand from "src/pages/CourseDetail/CourseRecommand";

import { GenericSkeleton } from "src/pages/Blog/Detail";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import CourseEnquiryForm from "src/pages/CourseDetail/CourseEnquiryForm";
import Head from "next/head";
// import { Helmet } from "react-helmet";

const CatgeoryDetail = ({ data, slug }) => {
  const history = useRouter();

  const schemas = !!data
    ? `{"@context": "https://schema.org/","@type": "Article","name": "${data?.name}","description": "${data?.description}","author": "Study Info Centre","datePublished":"2020/10/01","headline": "${data?.name}","image": "${data?.attachment}","mainEntityOfPage": "${data?.description}","publisher": {"@type": "Organization","name":  "Study Info Centre","logo": {"@type": "ImageObject","url": "${process.env.NEXT_PUBLIC_SITE_URL}/studyinfo.png"}}}`
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
          "@id": "/course-category-list",
          "name": "Course Categories"
        }
      },{
        "@type":"ListItem",
        "position":3,
        "item":{
          "@id":"/course-category/${data?.slug}",
          "name":"${data?.name}"
        }
      }
    ]
  }`
    : `{}`;

  if (!slug) return (_) => history.push("/");
  return (
    <GenericSkeleton isActive={history.isFallback}>
      <React.Fragment>
        <Head>
          <title>{data?.meta_title}</title>
          {data?.meta_description ? (
            <meta name="description" content={data?.meta_description} />
          ) : null}
          {data?.meta_keywords ? (
            <meta name="keywords" content={data?.meta_keywords} />
          ) : null}
          <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: (schemas) }} />
        <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: (breadCrumb) }} />
        </Head>
        <section className="bg-half bg-light course-category-wrapper">
          <div className="home-center">
            <div className="home-desc-center">
              <div className="container">
                <Row className="justify-content-center">
                  <Col lg={12} className="text-center">
                    <div className="page-next-level">
                      <div className="mt-4 d-lg-none d-md-none">
                        <h5 className="title">{data?.title}</h5>
                      </div>
                      <h1 className="title d-none d-lg-block d-md-block">
                        {data?.title}
                      </h1>
                      <ul className="list-unstyled mt-4"></ul>
                      <ul className="page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0">
                        <li>
                          <Link href="/">
                            <a className="text-uppercase font-weight-bold text-dark">
                              Home
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/course-category-list">
                            <a className="text-uppercase font-weight-bold text-dark">
                              Course Category
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href={`/course-category-detail/${data?.slug}`}>
                            <a className="text-uppercase font-weight-bold text-primary">
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

        <section className="section" id="lists">
          <div className="container">
            <Row>
              <Col lg={9} md={8}>
                <Col lg={12} md={12} className="sm-p-0">
                  <div className="overflow-hidden shadow rounded">
                    <CategoryWrapper {...data} />
                  </div>
                </Col>

                {/*     <Advertisement
                    type={ads[0]?.dimension_type}
                    image={ads[0]?.image}
                    url={ads[0]?.url}
                    wrapperClass="mt-4"
                  />
                  */}
                <Col lg={12} md={12}>
                  {data?.sub_categories?.length ? (
                    <div className="overflow-hidden mt-4 pt-4 shadow rounded">
                      <SubCatgoryWrapper subcategory={data?.sub_categories} />
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Col>

              {/* <Col lg={3} md={4}> */}
              {/*  <Advertisement
                    type={ads[1]?.dimension_type}
                    image={ads[1]?.image}
                    url={ads[1]?.url}
                  />
                  */}
              <CourseEnquiryForm width={3} name={data?.name} />
              {/* </Col> */}
            </Row>
            <Row>
              <Col md={12} lg={12}>
                <div className="mt-4 pt-2 p-4">
                  <CourseRecommand category={data?.id} />
                </div>
              </Col>
            </Row>
          </div>
        </section>
      </React.Fragment>
    </GenericSkeleton>
  );
};

export default CatgeoryDetail;
