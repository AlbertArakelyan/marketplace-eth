import { useState, useContext, useEffect, createContext, useMemo } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const Web3Context = createContext({});

const Web3Provider = ({ children }) => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        const web3 = new Web3(provider);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
        });
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
    return {
      ...web3Api,
      isWeb3Loaded: web3Api.web3 !== null,
      connect: web3Api.provider
        ? async () => {
            try {
              await web3Api.provider.request({ method: "eth_requestAccounts" });
            } catch {
              console.error("Cannot retrieve accounts, try to reload your browser please.");
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
  const ctx = useContext(Web3Context);
  return ctx;
};

export default Web3Provider;
