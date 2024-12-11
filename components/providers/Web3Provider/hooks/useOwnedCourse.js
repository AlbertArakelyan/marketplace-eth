import useSWR from "swr";

import { normalizeOwnedCourse } from "@/utils/normalize";

export const handler = (web3, contract) => (course, account) => {
  const swrRes = useSWR(
    web3 && contract && account ? `web3/ownedCourse/${account}` : null,
    async () => {
      const hexCourseId = web3.utils.utf8ToHex(course.id);
      const courseHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexCourseId },
        { type: "address", value: account }
      );

      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call(); // just call when you are jut calling and send when you make a transaction. call will not cost gas

      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }

      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );

  return swrRes;
};
