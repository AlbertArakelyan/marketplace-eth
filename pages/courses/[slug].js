import { Message, Modal } from "@/components/ui/common";
import { CourseHero, KeyPoints, Curriculum } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";

import { useOwnedCourse, useAccount } from "@/components/hooks/web3";

import { getAllCourses } from "@/content/courses/fetcher";

export const COURSE_STATES = {
  purchased: "purchased",
  activated: "activated",
  deactivated: "deactivated",
};

const Course = ({ course }) => {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);

  const courseState = ownedCourse.data?.state;
  const isLocked = courseState !== COURSE_STATES.activated;

  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
          hasOwner={!!ownedCourse.data}
        />
      </div>
      <KeyPoints points={course.wsl} />
      <div className="max-w-5xl mx-auto">
        {courseState === COURSE_STATES.purchased && (
          <Message type="info">
            Course is purchased and waiting for activation. Process can take up
            to 24 hours.
            <i className="block font-normal">
              In case of any questions, please contact us.
            </i>
          </Message>
        )}
        {courseState === COURSE_STATES.activated && (
          <Message>Wish you happy watching. to 24 hours.</Message>
        )}
        {courseState === COURSE_STATES.deactivated && (
          <Message type="danger">
            Course has been deactivated, due the incorrect purchase data.
            <i className="block font-normal">
              The functionality to watch the course has been temporarily
              disabled.
            </i>
            <i className="block font-normal">
              In case of any questions, please contact us.
            </i>
          </Message>
        )}
      </div>
      <Curriculum locked={isLocked} courseState={courseState} />
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
