const Item = ({ title, value, className = "" }) => {
  return (
    <div
      className={`px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6 ${className}`}
    >
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </p>
    </div>
  );
};

const ManagedCourseCard = ({ children, course }) => {
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="flex">
        <div className="border-t border-gray-200">
          {Object.keys(course).map((key, index) => (
            <Item
              key={key} 
              className={index % 2 ? "bg-gray-50" : ""}
              title={key}
              value={course[key]}
            />
          ))}
          <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ManagedCourseCard;
