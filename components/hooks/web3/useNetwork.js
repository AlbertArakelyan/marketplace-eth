import { useHooks } from "@/components/providers/Web3Provider";

export const useNetwork = () => {
  return useHooks((hooks) => hooks.useNetwork)();
};
