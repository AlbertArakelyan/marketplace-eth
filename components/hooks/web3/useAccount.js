import { useHooks } from "@/components/providers/Web3Provider";

export const useAccount = () => {
  return useHooks((hooks) => hooks.useAccount)();
};
