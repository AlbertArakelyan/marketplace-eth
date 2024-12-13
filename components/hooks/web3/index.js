import { useHooks } from "@/components/providers/Web3Provider";

const isDataEmpty = (data) => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && isDataEmpty(data);

  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse,
  };
};

export const useAccount = () => {
  return enhanceHook(useHooks((hooks) => hooks.useAccount)());
};

export const useNetwork = () => {
  return enhanceHook(useHooks((hooks) => hooks.useNetwork)());
};

export const useOwnedCourses = (courses, account) => {
  const swrRes = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourses)(courses, account)
  );

  return {
    ownedCourses: swrRes,
  };
};

export const useOwnedCourse = (course, account) => {
  const swrRes = enhanceHook(
    useHooks((hooks) => hooks.useOwnedCourse)(course, account)
  );

  return {
    ownedCourse: swrRes,
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
