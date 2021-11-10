import React from "react";
import { useSelector } from "react-redux";

import Blog from "../Blog/LatestBlog";
import OurMission from "./OurMission";
import WorkProcess from "./WorkProcess";
import ConnectWithUs from "./ConnectWithUs";
import HeroComponent from "./HeroComponent";
import Continent from "../Country/Continent";
import CourseCategory from "./CourseCategory";
import FeatureInstitute from "./FeatureInstitute";
import ClientTestimonials from "./ClientTestimonials";
import Advertisement from "src/components/ads/Advertisement";
import Head from "next/head";
// import { Helmet } from "react-helmet";

const StudyInfoCenter = ({
  data: {
    our_mission,
    connect_with_us,
    feature_institute,
    testimonials,
    how_it_work,
    seo,
    ads = [],
    total_course,
    total_institution,
    total_country
  }
}) => {
  const { countries, courses, continents, blogs } = useSelector((state) => ({
    countries: state.user.get("countries"),
    continents: state.user.get("continents"),
    courses: state.user.get("courses"),

    blogs: state.user.get("latest_blogs")
  }));
  
  const schema =`{"@context": "https://schema.org","@type": "WebSite","url": "${process.env.NEXT_PUBLIC_SITE_URL}","potentialAction": [{"@type": "SearchAction","target": {"@type": "EntryPoint","urlTemplate": "${process.env.NEXT_PUBLIC_SITE_URL}/search?course={search_term_string}"},"query-input": "required name=search_term_string"}]}`
  
  return (
    <>
      <Head>
        <title>{seo?.meta_title || "Study Info centre"}</title>
        {seo?.meta_description ? (
          <meta name="description" content={seo?.meta_description} />
        ) : (
          <meta
            name="description"
            content="We at Studyinfocentre strive for world-class education, focused in providing reliable information to international students and help them get closer to their ultimate study destination.
        Every year we assist thousands of students in their journey to study abroad by helping them find the right study programs that arrange their necessities, destinations and tendencies. Being a leading global higher education company,
        we guarantee to provide you the best consulting services.
        We empower the students to research all their study options to get the perfect student-university match. With significant industry experience and expertise, we are focused on creating a friendly student community abroad."
          />
        )}
        {!!seo?.meta_keywords ? (
          <meta name="keywords" content={seo?.meta_keywords} />
        ) : null}
        {seo?.meta_description ? (
          <meta property="og:description" content={seo?.meta_description} />
        ) : (
          <meta
            property="og:description"
            content="We at Studyinfocentre strive for world-class education, focused in providing reliable information to international students and help them get closer to their ultimate study destination.
           Every year we assist thousands of students in their journey to study abroad by helping them find the right study programs that arrange their necessities, destinations and tendencies. Being a leading global higher education company,
           we guarantee to provide you the best consulting services.
           We empower the students to research all their study options to get the perfect student-university match. With significant industry experience and expertise, we are focused on creating a friendly student community abroad."
          />
        )}
        <meta
          property="og:image"
          content="https://s3.ap-south-1.amazonaws.com/studyinfocentre.com/Banner/cover.png"
        />
        {seo?.meta_title ? (
          <meta property="og:title" content={seo?.meta_title} />
        ) : (
          <meta property="og:title" content="Study Info Centre" />
        )}
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="110" />
        <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: (schema) }} />
      </Head>
      <HeroComponent
        total_course={total_course}
        total_institution={total_institution}
        total_country={total_country}
      />

      <WorkProcess how_it_work={how_it_work} />

      <CourseCategory categories={courses} />
      <Advertisement
        type={ads[0]?.dimension_type}
        image={ads[0]?.image}
        url={ads[0]?.url}
      />
      <Continent
        countries={countries}
        continents={continents}
        title={"Where you want to study ?"}
      />

      {feature_institute && feature_institute.length > 0 ? (
        <FeatureInstitute feature_institute={feature_institute} />
      ) : (
        ""
      )}

      <OurMission {...our_mission} />

      <Advertisement
        type={ads[1]?.dimension_type}
        image={ads[1]?.image}
        url={ads[1]?.url}
      />

      <ConnectWithUs {...connect_with_us} />

      {testimonials && testimonials.length > 0 ? (
        <ClientTestimonials testimonials={testimonials} />
      ) : (
        ""
      )}

      {blogs && blogs.length > 0 ? <Blog blogs={blogs} /> : ""}
    </>
  );
};

export default StudyInfoCenter;
