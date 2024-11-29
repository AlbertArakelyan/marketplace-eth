import Link from "next/link";

import { useWeb3 } from "@/components/providers";

const Navbar = () => {
  const { connect } = useWeb3();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="#"
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
              <button
                className="px-8 py-3 border text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={connect}
              >
                Connect
              </button>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
