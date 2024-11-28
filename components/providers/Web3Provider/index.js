import { useContext, createContext } from "react";

const Web3Context = createContext({});

const Web3Provider = ({ children }) => {
  return <Web3Context.Provider value={{}}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export default Web3Provider;
