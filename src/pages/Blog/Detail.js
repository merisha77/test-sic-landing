import React, { useEffect, Fragment, useState } from "react";

import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import dynamic from "next/dynamic";
// import Tags from "./Tags";
//import Categories from "./Categories";
const Categories = dynamic(()=> import("./Categories"), {ssr:false});
//import SocialMedias from "./SocialMedias";
const SocialMedias = dynamic(()=> import("./SocialMedias"), {ssr:false});

import useWidth from "src/utilities/widthUtil";
//import BlogCard from "./BlogCard";

const BlogCard = dynamic(() => import("./BlogCard"));

//import Advertisement from "src/components/ads/Advertisement";
const Advertisement = dynamic(
  () => import("src/components/ads/Advertisement"),
  { ssr: false }
);

import Empty from "antd/lib/empty";
import Skeleton from "antd/lib/skeleton";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
const CourseEnquiryForm  = dynamic(()=> import("../CourseDetail/CourseEnquiryForm"),{ssr:false});
import { CloseOutlined } from "@ant-design/icons";
import Head from "next/head";
// import { Helmet } from "react-helmet";

const PageBlogDetail = ({ data }) => {
  const history = useRouter();
  const [showInqueryForm, setShowInqueryForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowInqueryForm(true), 40000);
  }, []);
  const { blog = {}, related_post = [], category, ads = [] } = data || {};

  const { isTablet, isMobile } = useWidth();
  // const schemas = !!data
  //   ? `{
  //     "@context": "https://schema.org/",
  //     "@type": "Article",
  //     "name": "${blog?.title}",
  //     "description": "${blog?.meta_description}",
  //     "contentReferenceTime": "${blog?.publish}",
  //     "datePublished": "${blog?.publish}",
  //     "author": "${blog?.author__first_name} ${blog?.author__last_name}",
  //     "headline": "${blog?.title}",
  //     "image": "${process.env.NEXT_PUBLIC_MEDIA + blog?.photo}",
  //     "dateModified": "${blog?.publish}",
  //     "mainEntityOfPage": "${blog?.meta_description}",
  //     "publisher": {
  //       "@type": "Organization",
  //       "name":  "Study Info Centre",
  //       "logo": {
  //         "@type": "ImageObject",
  //         "url": "${process.env.NEXT_PUBLIC_SITE_URL}/studyinfo.png"
  //       }
  //     }
  //   }`
  //   : `{}`;
    const schemas = !!data
    ? `{"@context": "https://schema.org/","@type": "Article","mainEntityOfPage":{"@type":"WebPage","@id": "${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog?.country__slug}/${blog?.category}/${blog?.slug}"},"headline":"${blog?.title}","url": "${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog?.country__slug}/${blog?.category}/${blog?.slug}","dateModified":"${blog?.publish}","datePublished":"${blog?.publish}","author": {"@type":"Person","name":"${blog?.author__first_name} ${blog?.author__last_name}"},"publisher": {"@type": "Organization","name": "Study Info Centre","logo": {"@type": "ImageObject","url": "${process.env.NEXT_PUBLIC_SITE_URL}/studyinfo.png"}},"image": {"@type":"ImageObject","name":"${blog?.title}","url":"${process.env.NEXT_PUBLIC_MEDIA + blog?.photo}"}}`
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
            "@id": "/blog",
            "name": "Blog"
          }
        },{
          "@type":"ListItem",
          "position":3,
          "item":{
            "@id":"/blog/${blog?.country__slug}",
            "name":"${blog?.country__name}"
          }
        },
        {
          "@type":"ListItem",
          "position":4,
          "item":{
            "@id":"/blog/${blog?.country__slug}/${blog?.category}/${blog?.slug}",
            "name":"${blog?.title}"
          }
        }
      ]
    }`
    : `{}`;
  return (
    <GenericSkeleton
      isActive={history.isFallback}
      bgClass='blog-detail-wrapper'
    >
      {!!data ? (
        <Fragment>
          <Head>
            <title>{blog?.meta_title}</title>
            {blog?.meta_description ? (
              <meta name='description' content={blog?.meta_description} />
            ) : null}
            {blog?.meta_keywords ? (
              <meta name='keywords' content={blog?.meta_keywords} />
            ) : null}
            {blog?.meta_description ? (
              <meta
                property='og:description'
                content={blog?.meta_description}
              />
            ) : null}
            {blog?.photo ? (
              <meta
                property='og:image'
                content={process.env.NEXT_PUBLIC_MEDIA + blog?.photo}
              />
            ) : (
              <meta
                property='og:image'
                content='https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/cover.png'
              />
            )}
            {blog?.meta_title ? (
              <meta property='og:title' content={blog?.meta_title} />
            ) : null}
            {blog?.meta_title ? (
              <meta name='title' content={blog?.meta_title}></meta>
            ) : null}
            <meta property='og:image:width' content='180' />
            <meta property='og:image:height' content='110' />
            <meta name='twitter:card' content={blog?.meta_keywords} />
            <meta
              name='twitter:url'
              content={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog?.country__slug}/${blog?.category}/${blog?.slug}`}
            />
            <meta name='twitter:title' content={blog?.meta_title} />
            <meta name='twitter:description' content={blog?.meta_description} />
            <meta
              name='twitter:image'
              content={process.env.NEXT_PUBLIC_MEDIA + blog?.photo}
            />
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
                  name={blog?.country__name}
                  country={blog?.country__name}
                />
              </div>
            </span>
          ) : null}

          <section className='bg-half bg-light blog-detail-wrapper'>
            <div className='home-center'>
              <div className='home-desc-center'>
                <div className='container'>
                  <Row
                    className={`justify-content-center ${
                      isMobile ? "pt-4" : ""
                    }`}
                  >
                    <Col lg={12} className='text-center'>
                      <div className='page-next-level'>
                        <div className='mt-4 d-lg-none d-md-none sm-m-0'>
                          <h1 className='title sm-m-0'>{blog?.title}</h1>
                        </div>
                        <h1 className='title d-none d-lg-block d-md-block'>
                          {blog?.title}
                        </h1>
                        {/* <ul className="list-unstyled mt-4 sm-m-0">
                          <li className="list-inline-item h6 user text-muted mr-2">
                            <i className="mdi mdi-account" />
                            {`${blog?.author__first_name} ${blog?.author__last_name}`}
                          </li>
                          <li className="list-inline-item h6 date text-muted">
                            <i className="mdi mdi-calendar-check" />
                            {new moment(blog?.publish?.split("T")[0]).format(
                              "DD MMM,YYYY"
                            )}
                          </li>
                        </ul> */}
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
                              <Link href='/blog'>
                                <a className='text-uppercase font-weight-bold text-dark'>
                                  Blog
                                </a>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`/blog/${blog?.country__slug}/${blog?.category}`}
                              >
                                <a className='text-uppercase font-weight-bold text-dark'>
                                  {blog?.country__name}
                                </a>
                              </Link>
                            </li>
                            <li>
                              <span className='text-uppercase text-primary font-weight-bold'>
                                {blog?.title}
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

          <section className={`${!isMobile ? "section" : "pt-3"}`}>
            {/* <section className='section'> */}
            <div className='container'>
              <Row>
                <Col lg={8} md={7}>
                  <div className='mr-lg-3'>
                    <div className='blog position-relative overflow-hidden shadow rounded'>
                      <div className='d-flex justify-content-center m-4'>
                        <img
                          loading='lazy'
                          src={process.env.NEXT_PUBLIC_MEDIA + blog?.photo}
                          className='img-fluid rounded-top'
                          alt='bog'
                        />
                      </div>
                      <div className='content p-4'>
                        <div className='list-inline-item h6 user text-muted mr-2 author-detail'>
                          <i className='mdi mdi-account' />
                          {`${blog?.author__first_name} ${blog?.author__last_name}`}
                          <i className='mdi mdi-calendar-check ml-4' />
                          {new Date(blog?.publish).toDateString()}
                        </div>
                        {!!blog?.tag ? (
                          <h6>
                            <i className='mdi mdi-tag text-primary mr-1'></i>
                            <a className='text-primary'> {blog?.tag}</a>
                          </h6>
                        ) : null}

                        <div
                          className='text-dark mt-3 blog-content'
                          dangerouslySetInnerHTML={{
                            __html: blog?.content,
                          }}
                        />

                        <Advertisement
                          type={ads[0]?.dimension_type}
                          image={ads[0]?.image}
                          url={ads[0]?.url}
                          wrapperClass='mt-4'
                        />

                        <SocialMedias />
                      </div>
                    </div>

                    <RelatedPosts relatedPost={related_post} />
                  </div>
                </Col>

                <Col
                  lg={4}
                  md={4}
                  className='col-12 mt-4 mt-sm-0 pt-2 pt-sm-0 widget'
                >
                  <Advertisement
                    type={ads[1]?.dimension_type}
                    image={ads[1]?.image}
                    url={ads[1]?.url}
                    wrapperClass='mb-4'
                  />
                  <div className='mt-sm-30 p-1 rounded shadow'>
                    <CourseEnquiryForm
                      name={blog?.country__name}
                      country={blog?.country__name}
                    />
                    <div className='p-4'>
                      <Categories
                        category={category}
                        countrySlug={blog?.country__slug}
                      />
                      {/* <Tags tags={[blog?.tag]} /> */}
                    </div>
                    {/* <SocialMedias /> */}
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </Fragment>
      ) : (
        <Empty />
      )}
    </GenericSkeleton>
  );
};

export default PageBlogDetail;

//TODO:This needs refactor
const RelatedPosts = ({ relatedPost = [] }) =>
  relatedPost?.length ? (
    <div className="mt-4 pt-2 p-4 shadow rounded">
      <h4 className="page-title">Related Posts :</h4>
      <Row>
        {relatedPost?.slice(0, 2)?.map((blog, idx) => (
          <BlogCard {...blog} key={`blog-card-${idx}`} width={6} isHome />
        ))}
      </Row>
    </div>
  ) : null;

export const GenericSkeleton = ({
  isActive,
  children,
  bgClass = "blog-detail-wrapper"
}) =>
  isActive ? (
    <>
      <section className={`bg-half bg-light`}>
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <Row className="justify-content-center">
                <Col lg={12} className="text-center">
                  <div className="page-next-level">
                    <Skeleton.Input
                      style={{ width: 200 }}
                      active
                      // size={size}
                    />
                    <ul className="list-unstyled mt-4">
                      <li className="list-inline-item h6 user text-muted mr-2">
                        <Skeleton.Input
                          style={{ width: 200 }}
                          active
                          size="small"
                        />
                      </li>
                      <li className="list-inline-item h6 date text-muted">
                        <Skeleton.Input
                          style={{ width: 200 }}
                          active
                          size="small"
                        />
                      </li>
                    </ul>
                    <ul className="page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0">
                      <li>
                        <Skeleton.Input
                          style={{ width: 200 }}
                          active
                          size="small"
                        />
                      </li>
                      <li>
                        <Skeleton.Input
                          style={{ width: 200 }}
                          active
                          size="small"
                        />
                      </li>
                      <li>
                        <Skeleton.Input
                          style={{ width: 200 }}
                          active
                          size="small"
                        />
                      </li>
                      <li>
                        <span className="text-uppercase text-primary font-weight-bold">
                          <Skeleton.Input
                            style={{ width: 200 }}
                            active
                            size="small"
                          />
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
      <section className="section">
        <div className="container">
          <Row>
            <Col lg={8} md={7}>
              <Skeleton avatar paragraph={{ rows: 4 }} active />
            </Col>
            <Col lg={4} md={4}>
              <Skeleton paragraph={{ rows: 2 }} active />
            </Col>
          </Row>
        </div>
      </section>
    </>
  ) : (
    children
  );
