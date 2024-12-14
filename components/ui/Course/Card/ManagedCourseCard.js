const ManagedCourseCard = ({ children, course }) => {
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="flex">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Course ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {course.ownedCourseId}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Proof</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {course.proof}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ManagedCourseCard;
