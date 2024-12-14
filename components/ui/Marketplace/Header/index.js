import { EthRates, WalletBar } from "@/components/ui/web3";
import { Breadcrumbs } from "@/components/ui/common";

const LINKS = [
  {href: "/marketplace", value: "Buy"},
  {href: "/marketplace/courses/owned", value: "My Courses"},
  {href: "/marketplace/courses/managed", value: "Manage Courses"},
]

const Header = () => {
  return (
    <div className="my-4  ">
      <WalletBar />
      <EthRates />
      <div className="flex flex-row-reverse px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </div>
  );
};

export default Header;
