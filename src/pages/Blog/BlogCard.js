//TODO: Verify the design later

import React from "react";
import Col from "reactstrap/lib/Col";
import Link from "next/link";
import { useRouter } from "next/router";

const BlogCard = ({
  width = 4,
  photo,
  title,
  meta_description,
  author__first_name,
  author__last_name,
  publish,
  slug,
  country__slug,
  category,
  isHome
}) => {
  const router = useRouter();
  return (
    <Col
      lg={width}
      md={6}
      sm={6}
      className="mt-4 pt-2 col-6"
      role="button"
      onClick={(_) => router.push(`/blog/${country__slug}/${category}/${slug}`)}
    >
      <div className="blog position-relative overflow-hidden shadow rounded">
        <Link href={`/blog/${country__slug}/${category}/${slug}`} prefetch={false}>
          <a>
            <div className="position-relative img-wrapper">
              <img
                loading="lazy"
                src={isHome ? process.env.NEXT_PUBLIC_MEDIA + photo : photo}
                className="img-fluid rounded-top"
                alt="blog"
              />
              <div className="overlay rounded-top bg-dark"></div>
            </div>
          </a>
        </Link>
        <div className="content p-4 sm-p-1">
          <h4>
            <Link href={`/blog/${country__slug}/${category}/${slug}`} prefetch={false}>
              <a className="title text-dark"> {title}</a>
            </Link>
          </h4>

          <div
            className="content-description line-clamp"
            dangerouslySetInnerHTML={{
              __html: meta_description?.substring(0, 200)
            }}
          />

          <div className="post-meta mt-3 p-4">
            <Link href={`/blog/${country__slug}/${category}/${slug}`} prefetch={false}>
              <a className="text-muted float-right readmore">
                Read More <i className="mdi mdi-chevron-right" />
              </a>
            </Link>
          </div>
        </div>
        <div className="author p-2">
          <small className="text-light user d-block">
            <i className="mdi mdi-account"></i>
            {author__first_name
              ? `${author__first_name} ${author__last_name}`
              : "Study Info Centre"}
          </small>
          <small className="text-light date">
            <i className="mdi mdi-calendar-check"></i>
            {new Date(publish).toDateString()}
          </small>
        </div>
      </div>
    </Col>
  );
};

export default BlogCard;
