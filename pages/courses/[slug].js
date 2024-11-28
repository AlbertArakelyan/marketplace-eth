import { Modal } from "@/components/ui/common";
import { CourseHero, KeyPoints, Curriculum } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";

import { getAllCourses } from "@/content/courses/fetcher";

const Course = ({ course }) => {
  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <KeyPoints points={course.wsl} />
      <Curriculum locked={true} />
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
