import useSWR from "swr";

import { normalizeOwnedCourse } from "@/utils/normalize";

export const handler = (web3, contract) => (courses, account) => {
  const swrRes = useSWR(
    web3 && contract && account ? `web3/ownedCourses/${account}` : null,
    async () => {
      const ownedCourses = [];

      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          continue;
        }

        const hexCourseId = web3.utils.utf8ToHex(course.id);
        const courseHash = web3.utils.soliditySha3(
          { type: "bytes16", value: hexCourseId },
          { type: "address", value: account }
        );

        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call(); // just call when you are jut calling and send when you make a transaction. call will not cost gas

        if (
          ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
        ) {
          const normalizedCourse = normalizeOwnedCourse(web3)(
            course,
            ownedCourse
          );

          ownedCourses.push(normalizedCourse);
        }
      }

      return ownedCourses;
    }
  );

  return swrRes;
};
