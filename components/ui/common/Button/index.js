const Button = ({ children, className = "", variant = "purple", ...props }) => {
  const variants = {
    white: "text-black bg-white",
    purple: "text-white bg-indigo-600 hover:bg-indigo-700",
    red: "text-white bg-red-600 hover:bg-red-700",
    lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
    green: "text-white bg-green-600 hover:bg-green-700",
  };

  return (
    <button
      className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 p-2 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
