import { Button, Message } from "@/components/ui/common";
import { OwnedCourseCard } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";

import { useOwnedCourses } from "@/components/hooks/web3";

const OwnedCourses = () => {
  const { ownedCourses } = useOwnedCourses();
  console.log(ownedCourses)
  return (
    <BaseLayout>
      {ownedCourses.data}
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

export default OwnedCourses;
