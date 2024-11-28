import { Modal } from "@/components/common";
import { CourseHero, KeyPoints, Curriculum } from "@/components/Course";
import { BaseLayout } from "@/components/layout";

import { getAllCourses } from "@/content/courses/fetcher";

const Course = ({ course }) => {
  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero />
      </div>
      <KeyPoints />
      <Curriculum />
      <Modal />
    </BaseLayout>
  );
};

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((course) => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.find((course) => course.slug === params.slug);

  return {
    props: {
      course,
    },
  };
}

export default Course;
