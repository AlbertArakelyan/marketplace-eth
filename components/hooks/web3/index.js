import { useHooks } from "@/components/providers/Web3Provider";

const enhanceHook = (swrRes) => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  };
};

export const useAccount = () => {
  return enhanceHook(useHooks((hooks) => hooks.useAccount)());
};

export const useNetwork = () => {
  return enhanceHook(useHooks((hooks) => hooks.useNetwork)());
};
