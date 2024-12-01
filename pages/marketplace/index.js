import { CourseList } from "@/components/ui/Course";
import { BaseLayout } from "@/components/ui/layout";
import { WalletBar } from "@/components/ui/web3";

import { useAccount } from "@/components/hooks/web3/useAccount";

import { getAllCourses } from "@/content/courses/fetcher";

const Marketplace = ({ courses }) => {
  const { account } = useAccount();
  return (
    <BaseLayout>
      <div className="my-4">
        <WalletBar address={account.data} />
      </div>
      <CourseList courses={courses} />
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
