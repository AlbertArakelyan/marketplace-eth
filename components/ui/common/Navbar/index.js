import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/common";

import { useWeb3 } from "@/components/providers";
import { useAccount } from "@/components/hooks/web3";

const Navbar = () => {
  const { pathname } = useRouter();

  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                href="#"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </Link>
            </div>
            <div>
              <Link
                href="#"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              {isLoading ? (
                <Button disabled onClick={connect}>
                  Connecting...
                </Button>
              ) : account.data ? (
                <Button className="cursor-default hover:bg-indigo-600">
                  Hi there! {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3 border text-base font-medium rounded-md inline-block text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Install Metamask
                </a>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {!pathname.includes("marketplace") && account.data && (
        <div className="flex justify-end mt-1 sm:px-6 lg:px-8">
          <span className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </span>
        </div>
      )}
    </section>
  );
};

export default Navbar;
