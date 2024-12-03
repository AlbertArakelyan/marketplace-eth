import Link from "next/link";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, index) => (
          <li
            key={item.href}
            className={`${
              index === 0 ? "pr-4" : "px-4"
            } font-medium text-gray-500 hover:text-gray-900`}
          >
            <Link href={item.href}>{item.value}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
