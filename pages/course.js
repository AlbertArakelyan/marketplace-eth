import { Modal } from "@/components/common";
import { CourseHero, KeyPoints, Curriculum } from "@/components/Course";
import { BaseLayout } from "@/components/layout";

const Course = () => {
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

export default Course;
