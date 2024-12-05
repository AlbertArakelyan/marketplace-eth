const SIZES = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const Loader = ({ size = "md" }) => {
  const sizeClassName = SIZES[size];

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full ${sizeClassName} border-b-2 border-gray-900`}></div>
    </div>
  );
};

export default Loader;
