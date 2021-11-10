import React, { useState, useEffect } from "react";
import { CardBody, Row, Col } from "reactstrap";
import useWidth from "src/utilities/widthUtil";
import Categroy from ".";
import { useRouter } from "next/dist/client/router";
import Advertisement from "src/components/ads/Advertisement";
import UniversityVideo from "./UniversityVideo";
import CourseEnquiryForm from "src/pages/CourseDetail/CourseEnquiryForm";
import FeatureInstitute from "src/pages/StudyInfoCentre/FeatureInstitute";
import { InfoWidget } from "src/pages/CourseDetail/UniversityInformation";
import APIServices from "src/apiUtils/APIServices";
import AddressContainer from "src/pages/CourseDetail/AddressContainer";

const University = (props) => {
  const history = useRouter();
  const { data } = props;
  const {
    institute,
    address = [],
    degree_data = [],
    no_course = [],
    ads = [],
  } = data || {};
  const { name, logo, about, video_url } = institute;
  const { isMobile, isTablet } = useWidth();
  const [featuredInstitute, setFeaturedInstitute] = useState();

  const fetchFeaturedUniversities = async () => {
    const { data, success } = await new APIServices(`feature-university`).get();
    if (success) setFeaturedInstitute(data?.data);
  };

  useEffect(() => {
    !!address[0]?.country__name && fetchFeaturedUniversities();
  }, [history]);
  return (
    <>
      {/* <Categroy data={props?.data} /> */}
      <section>
        <div className='container'>
          <Row>
            <Col lg={8} md={12}>
              <Col lg={12} md={12}>
                <div className=' overflow-hidden shadow rounded'>
                  {/* <University {...institute} /> */}
                  <div className='institute-details px-3'>
                    <CardBody className='pb-0'>
                      {!isMobile ? (
                        <Row className='mb-5 mt-2 justify-content-center'>
                          <div
                            className='about'
                            dangerouslySetInnerHTML={{ __html: about }}
                          />
                        </Row>
                      ) : (
                        <div
                          className='about row'
                          dangerouslySetInnerHTML={{ __html: about }}
                        />
                      )}
                    </CardBody>
                  </div>
                  {/* {isMobile ? (
                    <UniversityInfo {...institute} {...data} />
                  ) : null} */}
                </div>
              </Col>

              <Advertisement
                type={ads[0]?.dimension_type}
                image={ads[0]?.image}
                url={ads[0]?.url}
                wrapperClass='mt-4'
              />
              <Col lg={12} md={12}>
                {/* {render_degrees()} */}

                {address?.filter(
                  ({ longitude, latitude }) =>
                    longitude !== null && latitude !== null
                )?.length ? (
                  <div className='mt-4 pt-2 p-4 shadow rounded'>
                    <h4 className='page-title text-primary'>Address</h4>
                    <AddressContainer
                      addresses={address?.filter(
                        ({ longitude, latitude }) =>
                          longitude !== null && latitude !== null
                      )}
                    />
                  </div>
                ) : null}
              </Col>
            </Col>

            <Col lg={4} md={12}>
              {/* {!isMobile ? <UniversityInfo {...institute} {...data} /> : null} */}
              <UniversityVideo
                video_url={institute?.video_url}
                className='m-2 mt-4'
              />
              <Advertisement
                type={ads[1]?.dimension_type}
                image={ads[1]?.image}
                url={ads[1]?.url}
                wrapperClass='mt-4'
              />
              <CourseEnquiryForm
                name={institute?.name}
                country={address[0]?.country__name}
              />
            </Col>
          </Row>
        </div>
      </section>

      <FeatureInstitute feature_institute={featuredInstitute || []} />
    </>
  );
};

export default University;

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
