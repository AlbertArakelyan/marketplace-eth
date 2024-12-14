import { Fragment } from "react";
import Link from "next/link";

const BreadcrumbItem = ({ item, index }) => {
  return (
    <li
      className={`${
        index === 0 ? "pr-4" : "px-4"
      } font-medium text-gray-500 hover:text-gray-900`}
    >
      <Link href={item.href}>{item.value}</Link>
    </li>
  );
};

const Breadcrumbs = ({ items = [], isAdmin }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {items.map((item, index) => (
          <Fragment key={item.href}>
            {!item.requireAdmin && <BreadcrumbItem item={item} index={index} />}
            {item.requireAdmin && isAdmin && (
              <BreadcrumbItem item={item} index={index} />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
