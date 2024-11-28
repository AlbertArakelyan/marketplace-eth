import { Navbar, Footer, Hero, Breadcrumbs } from "@/components/common";
import { EthRates, WalletBar } from "@/components/web3";
import { OrderCard } from "@/components/Order";
import { CourseList } from "@/components/Course";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            <Hero />
            <Breadcrumbs />
            <WalletBar />
            <EthRates />
            <OrderCard />
            <CourseList />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
