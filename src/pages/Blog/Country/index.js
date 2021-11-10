// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { Steps, Empty, Skeleton } from "antd";
import { Container, Row, Col } from "reactstrap";
import {
  Send,
  Home,
  Target,
  Award,
  MapPin,
  Monitor,
  BookOpen,
  CreditCard,
  ShoppingBag,
  ChevronLeft,
  AlertCircle,
  ChevronRight,
} from "react-feather";

import useWidth from "src/utilities/widthUtil";
import APIServices from "src/apiUtils/APIServices";

import BlogCard from "../BlogCard";
import { useRouter } from "next/dist/client/router";

import Head from "next/head";

const { Step } = Steps;

const PageBlogList = (props) => {
  const history = useRouter();
  const [country, setCountry] = useState();
  const { countrySlug, category } = history.query;
  const [blogsByCountry, setBlogsByCountry] = useState();
  const categories = [
    {
      id: 1,
      icon: <MapPin />,
      key: "country",
      value: country,
    },
    {
      id: 2,
      icon: <Award />,
      key: "institute",
      value: "Institute",
    },
    {
      id: 3,
      icon: <CreditCard />,
      key: "finance",
      value: "Finance",
    },
    {
      id: 4,
      icon: <Send />,
      key: "visa",
      value: "Visa",
    },
    {
      id: 5,
      icon: <Home />,
      key: "accomodation",
      value: "Accomodation",
    },
    {
      id: 6,
      icon: <ShoppingBag />,
      key: "pre-departure",
      value: "Departure",
    },
    {
      id: 7,
      icon: <Target />,
      key: "career",
      value: "Career",
    },
    { id: 8, icon: <Monitor />, key: "news", value: "News" },
  ];
  const [loading, setloading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(
    categories.find(({ key }) => key === category) || categories[0]
  );
  useEffect(() => {
    fetchBlogByCountry();
  }, [activeCategory]);

  const fetchBlogByCountry = async (_) => {
    const { data = [], success } = await new APIServices(
      `/blog/${countrySlug}/${activeCategory.key || category}/`
    ).get();
    if (success) {
      setloading(false);
      setBlogsByCountry(data);
      if (!!data[0]?.country) setCountry(data[0]?.country);
      history.push(`/blog/${countrySlug}/${activeCategory.key || category}/`);
    } else {
      setloading(false);
      history.back();
    }
    // const { data } = props;
    // if (data) {
    //   setBlogsByCountry(data);
    //   if (!!data[0]?.country) setCountry(data[0]?.country);
    //   history.push(`/blog/${countrySlug}/${activeCategory.key || category}/`);
    // } else history.back();
  };

  useEffect(() => {
    window.scrollTo(0, 200);
  }, [activeCategory]);

  const { isMobile } = useWidth();

  useEffect(() => {
    if (!!countrySlug) {
    } else history.push("/blog");
  }, []);

  return (
    <GenericSkeleton
      isActive={loading}
      bgClass='blog-detail-wrapper'
      categories={categories}
      isMobile={isMobile}
      activeCategory={activeCategory}
    >
      <React.Fragment>
        <Head>
          <title>Blogs by Destination || {country} || Study Info Centre</title>
          <meta
            name='title'
            content={`Blogs by Destination || ${country} || Study Info Centre`}
          />
        </Head>
        <section className='bg-profile bg-half bg-light blog-continent-wrapper'>
          <Container>
            <Row>
              <Col lg={12} className='text-center'>
                <Breadcomb country={country} />
              </Col>

              <Col lg='12'>
                <div
                  className='public-profile position-relative p-4 bg-white overflow-hidden rounded shadow'
                  style={{ zIndex: "1" }}
                >
                  <Steps
                    labelPlacement='vertical'
                    current={activeCategory.id - 1}
                    size='small'
                    direction={isMobile ? "vertical" : "horizontal"}
                  >
                    {categories.map((c, idx) => (
                      <Step
                        icon={c.icon}
                        title={c.value}
                        className='pointer'
                        onClick={() => setActiveCategory(c)}
                        key={`category-key-${idx}`}
                      />
                    ))}
                  </Steps>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className='section'>
          <div className='container'>
            {/* <Skeleton loading={isActive} active> */}
            {blogsByCountry?.length ? (
              <Row className='pt-2'>
                <Col>
                  <div className='row mr-lg-2'>
                    {blogsByCountry?.map((blog, idx) => (
                      <BlogCard width={3} key={`blog-${idx}`} {...blog} />
                    ))}
                  </div>
                </Col>
              </Row>
            ) : (
              <Empty />
            )}
            {/* </Skeleton> */}
            {/* <Row>
            <Pagination />
          </Row> */}
          </div>
        </section>
        <div className='step-nav-wrapper container '>
          <div className='step-nav'>
            <StepNav
              isLeft
              isVisible={activeCategory.id > 1}
              Icon={ChevronLeft}
              label='Previous Step'
              currentStep={activeCategory.id - 1}
              targetPage={
                categories.find((a) => a.id === activeCategory.id - 1)?.value
              }
              onClick={() => {
                setActiveCategory(
                  categories.find((a) => a.id === activeCategory.id - 1)
                );
              }}
            />
            <StepNav
              Icon={ChevronRight}
              label='Next Step'
              isVisible={activeCategory.id > 0 && activeCategory.id < 10}
              currentStep={activeCategory.id + 1}
              targetPage={
                categories.find((a) => a.id === activeCategory.id + 1)?.value
              }
              onClick={() => {
                setActiveCategory(
                  categories.find((a) => a.id === activeCategory.id + 1)
                );
              }}
            />
          </div>
        </div>
      </React.Fragment>
    </GenericSkeleton>
  );
};

export default PageBlogList;

const StepNav = ({
  Icon,
  label,
  currentStep,
  targetPage,
  onClick,
  isLeft,
  isVisible,
}) =>
  isVisible ? (
    <div
      className={`step-nav-${isLeft ? "left" : "right"} text-primary d-flex`}
    >
      <span className='icon'>
        <Icon size={50} />
      </span>
      <span className='nav-wrapper d-flex'>
        <div className='sub-head text-primary'>{label}</div>

        {/*   <span className="bg-white step d-flex">{currentStep}</span>  */}
        <a onClick={onClick}>
          <span className='text-primary'>{targetPage}</span>
        </a>
      </span>
    </div>
  ) : null;

// const Pagination = (_) => (
//   <Col>
//     <ul className="pagination justify-content-center mb-0 list-unstyled">
//       <li>
//         <Link href="#!" className="pr-3 pl-3 pt-2 pb-2">
//           <a>Prev</a>
//         </Link>
//       </li>
//       <li className="active">
//         <Link href="#!" className="pr-3 pl-3 pt-2 pb-2">
//           1
//         </Link>
//       </li>
//       <li>
//         <Link href="#!" className="pr-3 pl-3 pt-2 pb-2">
//           2
//         </Link>
//       </li>
//       <li>
//         <Link href="#!" className="pr-3 pl-3 pt-2 pb-2">
//           3
//         </Link>
//       </li>
//       <li>
//         <Link href="#!" className="pr-3 pl-3 pt-2 pb-2">
//           Next
//         </Link>
//       </li>
//     </ul>
//   </Col>
// );

const Breadcomb = ({ country }) => (
  <Row className='justify-content-center'>
    <Col lg={12} className='text-center'>
      <div className='page-next-level'>
        <h4 className='title'> {country} </h4>
      </div>
    </Col>
  </Row>
);

export const GenericSkeleton = ({
  isActive,
  children,
  categories,
  isMobile,
  activeCategory,
}) =>
  isActive ? (
    <>
      <section className='bg-profile bg-half bg-light blog-continent-wrapper'>
        <Container>
          <Row>
            <Col lg={12} className='text-center'>
              <Skeleton.Input
                style={{ width: 200 }}
                active
                // size={size}
              />
            </Col>

            <Col lg='12'>
              <div
                className='public-profile position-relative p-4 bg-white overflow-hidden rounded shadow'
                style={{ zIndex: "1" }}
              >
                <Steps
                  labelPlacement='vertical'
                  current={activeCategory.id - 1}
                  size='small'
                  direction={isMobile ? "vertical" : "horizontal"}
                >
                  {categories.map((c, idx) => (
                    <Step
                      icon={c.icon}
                      title={c.value}
                      className='pointer'
                      onClick={() => setActiveCategory(c)}
                      key={`category-key-${idx}`}
                    />
                  ))}
                </Steps>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='section'>
        <div className='container'>
          <Row>
            {/* <Col lg={8} md={7}>
              <Skeleton avatar paragraph={{ rows: 4 }} active />
            </Col> */}
            <Col lg={3} md={4}>
              <Skeleton paragraph={{ rows: 3 }} active />
            </Col>
            <Col lg={3} md={4}>
              <Skeleton paragraph={{ rows: 3 }} active />
            </Col>
            <Col lg={3} md={4}>
              <Skeleton paragraph={{ rows: 3 }} active />
            </Col>
            <Col lg={3} md={4}>
              <Skeleton paragraph={{ rows: 3 }} active />
            </Col>
          </Row>
        </div>
      </section>
    </>
  ) : (
    children
  );
