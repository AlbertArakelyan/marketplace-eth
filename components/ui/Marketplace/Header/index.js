import { EthRates, WalletBar } from "@/components/ui/web3";
import { Breadcrumbs } from "@/components/ui/common";

const Header = () => {
  return (
    <>
      <WalletBar />
      <EthRates />
      <div className="flex flex-row-reverse px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
    </>
  );
};

export default Header;
