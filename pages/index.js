import { Hero, Breadcrumbs } from "@/components/common";
import { EthRates, WalletBar } from "@/components/web3";
import { OrderCard } from "@/components/Order";
import { CourseList } from "@/components/Course";
import { BaseLayout } from "@/components/layout";

export default function Home() {
  return (
    <BaseLayout>
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </BaseLayout>
  );
}
