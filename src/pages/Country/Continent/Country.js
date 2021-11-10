import React from "react";
import { Col } from "reactstrap";
import Link from "next/link";

import Image from "next/image";
const Country = ({ src, continent, country, slug, id, isBlog }) => (
  <Col lg={4} md={4} sm={6} className='spacing designing col-6'>
    <div className='work-container position-relative overflow-hidden rounded mt-3'>
      <Link
        // href={{
        //   pathname: isBlog
        //     ? `/blog/${slug}/country`
        //     : `/country-detail/${slug}`,
        //   id,
        //   country,
        // }}
        href={isBlog ? `/blog/[slug]/country` : `/country-detail/[slug]}`}
        as={isBlog ? `/blog/${slug}/country` : `/country-detail/${slug}`}
        title={country}
        prefetch={false}
      >
        <a className='mfp-image d-inline-block'>
          {/* <img
            loading='lazy'
            src={`${process.env.NEXT_PUBLIC_MEDIA}${src}`}
            className='img-fluid  rounded'
            alt={country}
          /> */}
          <Image
            loading='lazy'
            src={`${process.env.NEXT_PUBLIC_MEDIA}${src}`}
            alt={country}
            layout='fill'
            // className='img-fluid  rounded'
          />
          <div className='overlay-work'></div>
        </a>
      </Link>
      <div
        className='content'
        style={{
          left: 0,
          right: 0,
          backgroundColor: "#0000008c",
          padding: "0 1rem",
        }}
      >
        <Link
          href={isBlog ? `/blog/${slug}/country` : `/country-detail/${slug}`}
          prefetch={false}
        >
          <a className='title text-white d-block font-weight-bold'>{country}</a>
        </Link>
        <small className='text-light'>{continent}</small>
      </div>
    </div>
  </Col>
);
export default Country;
