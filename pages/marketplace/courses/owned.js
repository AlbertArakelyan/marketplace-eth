import { Button } from "@/components/ui/common";
import {Message} from "@/components/ui/common";
import { OwnedCourseCard } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";

const OwnedCourses = () => {
  return (
    <BaseLayout>
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
