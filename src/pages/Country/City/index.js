import React from "react";

const City = ({ name, photo, description }) => (
  <div className="mr-lg-3">
    <div className="sm-no-shadow blog position-relative overflow-hidden shadow rounded">
      <div className="position-relative">
        <img
          loading="lazy"
          src={`${process.env.NEXT_PUBLIC_MEDIA}${photo}`}
          className="img-fluid rounded-top"
          alt={name}
        />
      </div>
      <div
        className="content p-4 sm-p-0"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  </div>
);

export default City;
