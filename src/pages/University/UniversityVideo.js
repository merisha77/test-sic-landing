import React, { useState, useEffect } from "react";

import { CardBody, Row, Col } from "reactstrap";
import ReactPlayer from "react-player/youtube";
import useWidth from "src/utilities/widthUtil";
import { XCircle, PlayCircle } from "react-feather";

const UniversityVideo = ({ video_url }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isMobile, isTablet } = useWidth();

  return (
    <div className='cmr-lg-3 ol-12 mt-4 pt-2 pt-sm-0 col-md-12 col-lg-12'>
      {!!video_url ? (
        <>
          <img
            role='button'
            onClick={(_) => setIsModalVisible(true)}
            width='100%'
            src='https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/Youtube.png '
            alt='Testimonial'
            style={{
              boxShadow: "-5px 5px 5px 0px #00000059",
              borderRadius: "1rem",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%)",
            }}
            onClick={(_) => setIsModalVisible(true)}
          >
            <div className='play-button'>
              <button className='button'>
                <PlayCircle
                  size={isMobile ? 50 : 100}
                  className='text-secondary'
                  role='button'
                />
              </button>
            </div>
          </div>
          <VideoModal
            visible={isModalVisible}
            closeModal={(_) => setIsModalVisible(false)}
            video_url={video_url}
          />
        </>
      ) : null}
    </div>
  );
};

export default UniversityVideo;

const VideoModal = ({ visible, video_url, closeModal }) => {
  const { isMobile, isTablet } = useWidth();
  return visible ? (
    <div
      style={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        width: "100%",
        height: "100%",
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        overflow: "hidden",
      }}
      // className={!!visible ? "d-block" : "d-none"}
    >
      <div
        className='child'
        style={
          isMobile
            ? {
                zIndex: 100,
                margin: "45% auto",
                width: "100%",
                height: "auto",
                backgroundColor: "rgb(255, 255, 255)",
              }
            : {
                // padding: "1rem",
                zIndex: 100,
                margin: "7% auto",
                width: "70%",
                height: "65%",
                backgroundColor: "#fff",
              }
        }
      >
        <i
          onClick={closeModal}
          style={{
            top: 10,
            right: 10,
            display: "block",
            position: "absolute",
            color: "#fff",
          }}
          role='button'
        >
          <XCircle size={50} />
        </i>

        <ReactPlayer
          url={video_url}
          height={isMobile ? "280px" : isTablet ? "400px" : "100%"}
          width='100%'
          playing
          // muted
          config={{
            file: {
              attributes: {
                autoPlay: true,
                // muted: true,
              },
            },
          }}
        />
      </div>
    </div>
  ) : null;
};
