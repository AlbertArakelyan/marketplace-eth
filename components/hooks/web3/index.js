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

export const useOwnedCourses = (courses, account) => {
  const swrRes = enhanceHook(useHooks((hooks) => hooks.useOwnedCourses)(courses, account));

  return {
    ownedCourses: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const canPurchaseCourse = !!(account.data && network.isSupported);

  return {
    account,
    network,
    canPurchaseCourse,
  };
};
