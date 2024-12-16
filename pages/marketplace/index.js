import { useState } from "react";

import { CourseCard, CourseList } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { Button } from "@/components/ui/common";
import { OrderModal } from "@/components/ui/Order";
import { MarketHeader } from "@/components/ui/Marketplace";

import { useWalletInfo } from "@/components/hooks/web3";
import { useWeb3 } from "@/components/providers";

import { getAllCourses } from "@/content/courses/fetcher";

const Marketplace = ({ courses }) => {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallter, account } = useWalletInfo();

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCloseOrderModal = () => {
    setSelectedCourse(null);
  };

  const handlePurchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );
    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(order.price.toString());

    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({
          from: account.data,
          value,
        });
      console.log(result);
    } catch {
      console.log("Purchase course: Operation has failed");
    }
  };

  return (
    <BaseLayout>
      <MarketHeader />
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!hasConnectedWallter}
            Footer={() => {
              if (requireInstall) {
                return (
                  <Button variant="lightPurple" disabled={true}>
                    Install
                  </Button>
                );
              }

              return (
                <Button
                  variant="lightPurple"
                  disabled={!hasConnectedWallter}
                  onClick={() => setSelectedCourse(course)}
                >
                  Purchase
                </Button>
              );
            }}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onSubmit={handlePurchaseCourse}
          onClose={handleCloseOrderModal}
        />
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
