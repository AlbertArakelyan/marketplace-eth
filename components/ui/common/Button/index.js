const SIZE = {
  sm: "p-2 text-base xs:px-4",
  md: "p-3 text-base xs:px-8",
  lg: "p-3 text-lg xs:px-8",
};

const Button = ({
  children,
  className = "",
  variant = "purple",
  size = "md",
  ...props
}) => {
  const variants = {
    white: "text-black bg-white",
    purple: "text-white bg-indigo-600 hover:bg-indigo-700",
    red: "text-white bg-red-600 hover:bg-red-700",
    lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
    green: "text-white bg-green-600 hover:bg-green-700",
  };
  const sizeClass = SIZE[size];

  return (
    <button
      className={`disabled:opacity-50 disabled:cursor-not-allowed  border rounded-md font-medium ${className} ${sizeClass} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
