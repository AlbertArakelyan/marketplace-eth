import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Message } from "@/components/ui/common";
import { OwnedCourseCard } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";

import { useOwnedCourses, useWalletInfo } from "@/components/hooks/web3";
import { getAllCourses } from "@/content/courses/fetcher";

const OwnedCourses = ({ courses }) => {
  const router = useRouter();

  const { account } = useWalletInfo();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <BaseLayout>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.isEmpty && (
          <div>
            <Message>
              You do not own any courses yet. You can buy them from the{" "}
              <Link
                className="text-indigo-600 hover:underline"
                href="/marketplace"
              >
                marketplace
              </Link>
              .
            </Message>
          </div>
        )}
        {ownedCourses.data?.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button onClick={() => router.push(`/courses/${course.slug}`)}>
              Watch the course
            </Button>
          </OwnedCourseCard>
        ))}
      </section>
    </BaseLayout>
  );
};

export function getStaticProps() {
  const { data } = getAllCourses();

  return {
    props: {
      courses: data,
    },
  };
}

export default OwnedCourses;
