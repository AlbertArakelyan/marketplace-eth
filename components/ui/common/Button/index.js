const Button = ({ children, className = "", variant = "purple", ...props }) => {
  const variants = {
    purple: "text-white bg-indigo-600 hover:bg-indigo-700",
    red: "text-white bg-red-600 hover:bg-red-700",
    lightPurple: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
  };

  return (
    <button
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border text-base font-medium rounded-md ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
