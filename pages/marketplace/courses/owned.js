import { Button, Message } from "@/components/ui/common";
import { OwnedCourseCard } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";

import { useOwnedCourses, useWalletInfo } from "@/components/hooks/web3";
import { getAllCourses } from "@/content/courses/fetcher";

const OwnedCourses = ({ courses }) => {
  const { account } = useWalletInfo();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <BaseLayout>
      {JSON.stringify(ownedCourses.data)}
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>My custom message!</Message>
          <Button>Watch the course</Button>
        </OwnedCourseCard>
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
