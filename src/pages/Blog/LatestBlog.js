// React Basic and Bootstrap
import React from "react";

import Empty from "antd/lib/empty";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

import Link from "next/link";

import BlogCard from "../Blog/BlogCard";

const Blog = ({ blogs }) => (
  <section className="section">
    <div className="container">
      <Row className="justify-content-center">
        <Col className="text-center">
          <div className="section-title mb-4 pb-2">
            <h4 className="main-title mb-4 text-primary">Latest Blog</h4>
          </div>
        </Col>
      </Row>
      {blogs?.length ? (
        <Row>
          {blogs?.slice(0, 4).map((blog, idx) => (
            <BlogCard key={`blog-${idx}`} {...blog} width={3} isHome />
          ))}
          <Col className="mt-4 pt-2 d-flex" style={{ alignItems: "center" }}>
            <Link href="/blog" prefetch={false}>
              <a className="btn btn-secondary ">
                See More <i className="mdi mdi-chevron-right" />
              </a>
            </Link>
          </Col>
        </Row>
      ) : (
        <Empty />
      )}
    </div>
  </section>
);

export default Blog;
