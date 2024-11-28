import { Hero } from "@/components/ui/common";
import { CourseList } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";

import { useWeb3 } from "@/components/providers";

import { getAllCourses } from "@/content/courses/fetcher";

export default function Home({ courses }) {
  return (
    <BaseLayout>
      <Hero />
      <CourseList courses={courses} />
    </BaseLayout>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return {
    props: {
      courses: data,
    },
  };
}
