import { useState } from "react";

import { CourseCard, CourseList } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { Button } from "@/components/ui/common";
import { OrderModal } from "@/components/ui/Order";
import { MarketHeader } from "@/components/ui/Marketplace";

import { useWalletInfo } from "@/components/hooks/web3";

import { getAllCourses } from "@/content/courses/fetcher";

const Marketplace = ({ courses }) => {
  const { canPurchaseCourse } = useWalletInfo();

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCloseOrderModal = () => {
    setSelectedCourse(null);
  };

  return (
    <BaseLayout>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div>
                <Button
                  variant="lightPurple"
                  disabled={!canPurchaseCourse}
                  onClick={() => setSelectedCourse(course)}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal course={selectedCourse} onClose={handleCloseOrderModal} />
      )}
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

export default Marketplace;
