import { useState, useContext, useEffect, createContext, useMemo } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import { setupHooks } from "./hooks/setupHooks";

import { loadContract } from "@/utils/loadContract";

const Web3Context = createContext({});

const setListeners = (provider) => {
  provider.on("chainChanged", () => window.location.reload());
};

const createWeb3State = ({ provider, web3, contract, isLoading }) => {
  return {
    provider,
    web3,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

const Web3Provider = ({ children }) => {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      provider: null,
      web3: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        const contract = await loadContract("CourseMarketplace", web3);

        setListeners(provider);
        setWeb3Api(
          createWeb3State({
            provider,
            web3,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((prevWeb3Api) => ({
          ...prevWeb3Api,
          isLoading: false,
        }));
        console.error("Please install MetaMask.");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
            } catch {
              console.error(
                "Cannot retrieve accounts, try to reload your browser please."
              );
              // location.reload();
            }
          }
        : () =>
            console.error(
              "Cannot connect to Metamask, try to reload your browser please."
            ),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const useHooks = (cb) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};

export default Web3Provider;
