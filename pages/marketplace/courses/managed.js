import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";
import {
  CourseFilter,
  OwnedCourseCard,
  ManagedCourseCard,
} from "@/components/ui/Course";
import { Button } from "@/components/ui/common";

import { useAccount, useManagedCourses } from "@/components/hooks/web3";

const ManagedCourses = () => {
  const { account } = useAccount();
  const { managedCourses } = useManagedCourses(account.data);

  return (
    <BaseLayout>
      <div>
        <MarketHeader />
        <CourseFilter />
      </div>
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <div className="flex mr-2 relative rounded-md">
              <input
                type="text"
                name="account"
                id="account"
                className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                placeholder="0x2341ab..."
              />
              <Button>Verify</Button>
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </BaseLayout>
  );
};

export default ManagedCourses;
