import { useState } from "react";

import { CourseCard, CourseList } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { WalletBar } from "@/components/ui/web3";
import { Button } from "@/components/ui/common";
import { OrderModal } from "@/components/ui/Order";

import { useAccount, useNetwork } from "@/components/hooks/web3";

import { getAllCourses } from "@/content/courses/fetcher";

const Marketplace = ({ courses }) => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCloseOrderModal = () => {
    setSelectedCourse(null);
  };

  return (
    <BaseLayout>
      <div className="my-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse,
          }}
        />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div>
                <Button
                  variant="lightPurple"
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
