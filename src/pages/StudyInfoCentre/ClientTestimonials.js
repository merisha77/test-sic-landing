import React, { useState, useEffect } from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";

// RBCarousel Declare
import RBCarousel from "react-bootstrap-carousel";

import useWidth from "src/utilities/widthUtil";

const ClientTestimonials = ({ testimonials = [] }) => {
  const { isMobile, isTablet, isLaptop } = useWidth();
  const [initialData, setInitialData] = useState({
    itemCount: 3, //
    cols: 4
  });

  useEffect(() => {
    isMobile && setInitialData({ itemCount: 1, cols: 12 });
    isTablet && setInitialData({ itemCount: 2, cols: 6 });
    isLaptop && setInitialData({ itemCount: 3, cols: 4 });
  }, [isMobile, isTablet, isLaptop]);

  const showItems = () => {
    let itemsData = [];
    let data = [];
    for (let i = 0; i < testimonials.length; i++) {
      if (i % initialData.itemCount === 0 && i > 0) {
        data.push(
          <div
            className="item"
            key={"item-" + i + new Date().getMilliseconds()}
          >
            <div className="row">{itemsData}</div>
          </div>
        );
        itemsData = [];
      }
      itemsData.push(
        <div
          className={`col-md-${initialData.cols}`}
          key={
            testimonials[i].id + new Date().getMilliseconds() + Math.random()
          }
        >
          <div className="customer-testi text-left">
            <img  loading="lazy"
              src={`${process.env.NEXT_PUBLIC_MEDIA}/${testimonials[i].image}`}
              height="80"
              className="rounded shadow float-left mr-3"
              alt="bog"
            />
            <div className="content overflow-hidden d-block p-3 shadow rounded bg-white">
              <p className="text-muted mt-2">" {testimonials[i].message}"</p>
              <h6 className="text-primary">
                - {testimonials[i].full_name}
                <small className="text-muted ml-2">
                  ({testimonials[i].designation})
                </small>
              </h6>
            </div>
          </div>
        </div>
      );
    }
    if (itemsData) {
      data.push(
        <div
          className="item"
          key={"item-row-" + new Date().getMilliseconds() + Math.random()}
        >
          <div className="row">{itemsData}</div>
        </div>
      );
    }
    return data;
  };

  return (
    <React.Fragment>
      <section className="section bg-light">
        <div className="container">
          <Row className="justify-content-center">
            <Col className="text-center">
              <div className="section-title mb-60">
                <h4 className="main-title mb-4 text-primary">
                  What students say about us ?
                </h4>
              </div>
            </Col>
          </Row>
          {testimonials?.length ? (
            <Row className="justify-content-center">
              <Col lg={12} className="text-center">
                <div id="customer-testi" className="owl-carousel owl-theme">
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

export default ClientTestimonials;
