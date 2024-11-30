const Button = ({
  children,
  className = "text-white bg-indigo-600 hover:bg-indigo-700",
  ...props
}) => {
  return (
    <button
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border text-base font-medium rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
