import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";
import { OwnedCourseCard } from "@/components/ui/Course";

const OwnedCourses = () => {
  return (
    <BaseLayout>
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </BaseLayout>
  );
};

export default OwnedCourses;
