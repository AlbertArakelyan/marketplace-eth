import { useState } from "react";

import { CourseCard, CourseList } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { Button, Message } from "@/components/ui/common";
import { OrderModal } from "@/components/ui/Order";
import { MarketHeader } from "@/components/ui/Marketplace";

import { useOwnedCourses, useWalletInfo } from "@/components/hooks/web3";
import { useWeb3 } from "@/components/providers";

import { getAllCourses } from "@/content/courses/fetcher";

import { COURSE_STATES } from "@/pages/courses/[slug]";

const courseStateColorMapping = {
  [COURSE_STATES.purchased]: "warning",
  [COURSE_STATES.activated]: "success",
  [COURSE_STATES.deactivated]: "danger",
};

const Marketplace = ({ courses }) => {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallter, account } = useWalletInfo();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const handleCloseOrderModal = () => {
    setSelectedCourse(null);
    setIsNewPurchase(true);
  };

  const handlePurchaseCourse = async (order) => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    const value = web3.utils.toWei(order.price.toString());

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        { type: "bytes32", value: emailHash },
        { type: "bytes32", value: orderHash }
      );

      await _purchaseCourse(hexCourseId, proof, value);
    } else {
      await _repurchaseCourse(orderHash, value);
    }
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
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

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      const result = await contract.methods.repurchaseCourse(courseHash).send({
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
            state={ownedCourses.lookup[course.id]?.state}
            disabled={!hasConnectedWallter}
            Footer={() => {
              if (requireInstall) {
                return (
                  <Button variant="lightPurple" disabled={true}>
                    Install
                  </Button>
                );
              }

              // add case for is connecting

              if (!ownedCourses.hasInitialResponse) {
                return (
                  <Button variant="lightPurple" disabled={true}>
                    Loading State
                  </Button>
                );
              }

              const owned = ownedCourses.lookup[course.id];

              if (owned) {
                const courseStateText =
                  COURSE_STATES[owned.state][0].toUpperCase() +
                  COURSE_STATES[owned.state].slice(1);

                return (
                  <>
                    <Button
                      className="mb-1"
                      variant="green"
                      size="sm"
                      disabled={true}
                    >
                      Owned &#10004;
                    </Button>
                    {owned.state === COURSE_STATES.deactivated && (
                      <Button
                        className="mb-1"
                        variant="purple"
                        size="sm"
                        onClick={() => {
                          setIsNewPurchase(false);
                          setSelectedCourse(course);
                        }}
                      >
                        Fund to Activate
                      </Button>
                    )}
                    <Message
                      type={courseStateColorMapping[owned.state]}
                      size="sm"
                    >
                      {courseStateText}
                    </Message>
                  </>
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
          isNewPurchase={isNewPurchase}
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
