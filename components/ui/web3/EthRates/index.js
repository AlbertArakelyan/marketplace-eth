import Image from "next/image";

import { useEthPrice } from "@/components/hooks/useEthPrice";

const EthRates = () => {
  const { eth } = useEthPrice();

  return (
    <div className="grid grid-cols-4 mb-5">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="inline-flex items-center">
            <Image
              layout="fixed"
              width={35}
              height={35}
              src="/small-eth.webp"
              alt={"eth"}
            />
            <span className="text-2xl font-bold"> = {eth.data}$</span>
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="py-10 px-8 border drop-shadow rounded-md">
          <div className="inline-flex items-center">
            <span className="text-2xl font-bold">${eth.ethPerItem}</span>
            <Image
              layout="fixed"
              width={35}
              height={35}
              src="/small-eth.webp"
              alt={"eth"}
            />
            <span className="text-2xl font-bold"> = 15$</span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
};

export default EthRates;
