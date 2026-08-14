import { LoaderCircle } from "lucide-react";

// Loader.jsx
const Loader = ({ size = "md", className = "" }) => {

  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <LoaderCircle className={`animate-spin text-gray-500 ${sizes[size]} ${className}`} />
  );
};

export default Loader;