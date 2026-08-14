import { LoaderCircleIcon } from "lucide-react";
import Loader from "./Loader";


const Button = ({
  children,
  variant = "primary",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}) => {

  const styles = {
    primary:
      "bg-black text-white hover:bg-gray-200 hover:text-black transition duration-500",

    secondary:
      "bg-white text-black border border-black hover:bg-gray-200 transition duration-500",

    confirmed: "bg-gray-700 text-white hover:bg-gray-800 cursor-pointer",

    outline:
      "bg-transparent text-black border border-gray-300 hover:bg-gray-100",
  };

  const sizes = {
    default: "w-50 h-10",
    small: "w-auto px-4 h-9",
    large: "w-full h-12",
  };

  const isDisabled = disabled || loading;


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-50
        h-10
        p-2
        rounded-2xl
        font-normal
        transition
        duration-300
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-gray-400

        ${styles[variant]}
        ${sizes[size]}

        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }

        ${className}
      `}
    >
      {
      
      loading ? (
        <div className="flex justify-center items-center">
        <Loader size="sm" className="text-current" />
        </div>
      ): (
        
        children
      )
      }
    </button>
  );
};

export default Button;