import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Mainnet",
  3: "Ropsten Testnet",
  4: "Rinkeby Testnet",
  42: "Kovan Testnet",
  56: "Binance Smart Chain",
  97: "Binance Smart Chain Testnet",
  137: "Polygon",
  80001: "Mumbai",
  42161: "Arbitrum",
  421611: "Arbitrum Testnet",
  11155111: "Sepolia Testnet",
  10: "Optimism",
  420: "Optimism Testnet",
  42170: "Avalanche",
  43113: "Avalanche Testnet",
  43114: "Avalanche",
  1337: "Ganache Local Testnet",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
  const { data, error, mutate, ...rest } = useSWR(
    web3 ? "web3/network" : null,
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId] ?? "Unknown";
    }
  );

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) => {
        mutate(NETWORKS[parseInt(chainId, 16)] ?? "Unknown");
      });
  }, [web3]);

  return {
    network: {
      data,
      mutate,
      target: targetNetwork,
      isSupported: data === targetNetwork,
      ...rest,
    },
  };
};
