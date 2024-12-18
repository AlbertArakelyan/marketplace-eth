import { useState } from "react";

import { BaseLayout } from "@/components/ui/layout";
import { MarketHeader } from "@/components/ui/Marketplace";
import { CourseFilter, ManagedCourseCard } from "@/components/ui/Course";
import { Button, Message } from "@/components/ui/common";

import { useAdmin, useManagedCourses } from "@/components/hooks/web3";
import { useWeb3 } from "@/components/providers";

import { normalizeOwnedCourse } from "@/utils/normalize";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={handleChange}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button onClick={() => onVerify(email)}>Verify</Button>
    </div>
  );
};

const ManagedCourses = () => {
  const { web3, contract } = useWeb3();
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);

  const [proofedOwnership, setProofedOwnership] = useState({});
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filters, setFilters] = useState({ state: "" });

  const verifyCourse = (email, { hash, proof }) => {
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: hash }
    );

    if (proofToCheck === proof) {
      setProofedOwnership({ ...proofedOwnership, [hash]: true });
    } else {
      setProofedOwnership({ ...proofedOwnership, [hash]: false });
    }
  };

  const changeCourseState = async (courseHash, method) => {
    try {
      await contract.methods[method](courseHash).send({
        from: account.data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const activateCourse = async (courseHash) => {
    changeCourseState(courseHash, "activateCourse");
  };

  const deactivateCourse = async (courseHash) => {
    changeCourseState(courseHash, "deactivateCourse");
  };

  const searchCourse = async (courseHash) => {
    const regex = /[0-9A-Fa-f]{6}/g;

    if (!(courseHash && courseHash.length === 66 && regex.test(courseHash))) {
      return setSearchedCourse(null);
    }

    const course = await contract.methods.getCourseByHash(courseHash).call();

    if (course.owner !== "0x0000000000000000000000000000000000000000") {
      const normalizedCourse = normalizeOwnedCourse(web3)(
        { hash: courseHash },
        course
      );

      setSearchedCourse(normalizedCourse);
    }
  };

  const selectCourseState = (value) => {
    setFilters({ state: value });
  };

  const renderCard = (course, isSearched) => {
    return (
      <ManagedCourseCard
        key={course.ownedCourseId}
        course={course}
        isSearched={isSearched}
      >
        <VerificationInput
          onVerify={(email) =>
            verifyCourse(email, { hash: course.hash, proof: course.proof })
          }
        />
        {proofedOwnership[course.hash] && (
          <div className="mt-2">
            <Message>Verified!</Message>
          </div>
        )}
        {proofedOwnership[course.hash] === false && (
          <div className="mt-2">
            <Message type="danger">Wrong Proof!</Message>
          </div>
        )}
        {course.state === "purchased" && (
          <div className="mt-2">
            <Button variant="green" onClick={() => activateCourse(course.hash)}>
              Activate
            </Button>
            <Button variant="red" onClick={() => deactivateCourse(course.hash)}>
              Deactivate
            </Button>
          </div>
        )}
      </ManagedCourseCard>
    );
  };

  if (!account.isAdmin) {
    return null;
  }

  return (
    <BaseLayout>
      <div>
        <MarketHeader />
        <CourseFilter
          onSearchSubmit={searchCourse}
          onFilterSelect={selectCourseState}
        />
      </div>
      <section className="grid grid-cols-1">
        {searchedCourse && (
          <div>
            <h2 className="text-2xl font-bold my-5 pl-5">Serached Course</h2>
            {renderCard(searchedCourse, true)}
          </div>
        )}
        <h2 className="text-2xl font-bold my-5 pl-5">All Courses</h2>
        {managedCourses.data?.map((course) => renderCard(course))}
      </section>
    </BaseLayout>
  );
};

export default ManagedCourses;
