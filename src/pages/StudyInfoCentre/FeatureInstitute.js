import React, { useState, useEffect } from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";
import RBCarousel from "react-bootstrap-carousel";

import useWidth from "src/utilities/widthUtil";

import Link from "next/link";
import Image from "next/image";

const FeatureInstitute = ({ feature_institute = [] }) => {
  const { isMobile } = useWidth();
  const [initialData, setInitialData] = useState({
    itemCount: isMobile ? 1 : 3, //
    cols: 4,
  });

  useEffect(() => {
    const updateWindowSize = () => {
      if (window.outerWidth >= 1230) {
        setInitialData({ itemCount: 3, cols: 4 });
      } else if (window.outerWidth >= 970 && window.outerWidth < 1230) {
        setInitialData({ itemCount: 2, cols: 6 });
      } else if (window.outerWidth <= 970) {
        setInitialData({ itemCount: 1, cols: 12 });
      }
    };
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [typeof window !== "undefined" && window?.outerWidth]);

  const showItems = () => {
    let itemsData = [];
    let data = [];
    for (let i = 0; i < feature_institute.length; i++) {
      if (i % initialData.itemCount === 0 && i > 0) {
        data.push(
          <div className='item' key={i + new Date().getMilliseconds()}>
            <div className='row'>{itemsData}</div>
          </div>
        );
        itemsData = [];
      }
      itemsData.push(
        <div
          className={`col-md-${initialData.cols}`}
          key={
            feature_institute[i].id +
            new Date().getMilliseconds() +
            Math.random()
          }
        >
          <div className='customer-testi text-left key-feature d-flex bg-light shadow  category-card-wrapper rounded p-2 pointer'>
            <Link
              href={`/institute-detail/${feature_institute[i]?.slug}`}
              prefetch={false}
            >
              <a>
                <Image
                  loading='lazy'
                  src={`${process.env.NEXT_PUBLIC_MEDIA}${feature_institute[i].logo}`}
                  alt='bog'
                  height='100'
                  width='200'
                  // layout='fill'
                  objectFit='contain'
                  maxWidth='200px'
                />
                {/* <img
                  loading='lazy'
                  src={`${process.env.NEXT_PUBLIC_MEDIA}${feature_institute[i].logo}`}
                  height='100'
                  className=''
                  alt='bog'
                  style={{ objectFit: "contain", maxWidth: "200px" }}
                /> */}
              </a>
            </Link>
          </div>
        </div>
      );
    }
    if (itemsData) {
      data.push(
        <div
          className='item'
          key={"item-row-" + new Date().getMilliseconds() + Math.random()}
        >
          <div className='row'>{itemsData}</div>
        </div>
      );
    }
    return data;
  };

  return (
    <React.Fragment>
      <section className='section'>
        <div className='container'>
          <Row className='justify-content-center'>
            <Col className='text-center'>
              <div className='section-title mb-60'>
                <h4 className='main-title mb-4 text-primary'>
                  Featured Institutes
                </h4>
              </div>
            </Col>
          </Row>
          {feature_institute?.length ? (
            <Row className='justify-content-center'>
              <Col lg={12} className='text-center'>
                <div className='container'>
                  <RBCarousel
                    version={4}
                    autoplay={true}
                    pauseOnVisibility={true}
                    slideshowSpeed={3000}
                  >
                    {showItems()}
                  </RBCarousel>
                </div>
              </Col>
            </Row>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default FeatureInstitute;
