// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Continent from "src/pages/Country/Continent";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import Link from "next/link";
import Head from "next/head";

const PageBlogList = ({ data }) => {
  const { countries } = data;
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const continent = new Set();
    countries.forEach((c) => {
      continent.add(c.continent_name);
    });
    setContinents(Array.from(continent));
  }, []);
  // const { countries, continents } = useSelector((state) => ({
  //   countries: state.user.get("countries"),
  //   continents: state.user.get("continents"),
  // }));
  return (
    <React.Fragment>
      <Head>
        <title>Blogs by Destination || Study Info Centre</title>
      </Head>
      <section className='bg-half bg-light blog-continent-wrapper mb-1'>
        <div className='home-center'>
          <div className='home-desc-center'>
            <div className='container'>
              <Row className='justify-content-center'>
                <Col lg={12} className='text-center'>
                  <div className='page-next-level'>
                    <h1 className='title'>Blogs by Destination </h1>

                    <ul className='page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0'>
                      <li>
                        <Link href='/' prefetch={false}>
                          <a className='text-uppercase font-weight-bold text-dark'>
                            Home
                          </a>
                        </Link>
                      </li>

                      <li>
                        <span className='text-uppercase text-primary font-weight-bold'>
                          Blogs by Destination
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
      <Continent
        isBlog
        countries={countries}
        continents={continents}
        bg='bg-white'
        // title={"Blogs by Destination"}
      />
      {/* <Blog/> */}
    </React.Fragment>
  );
};

export default PageBlogList;
