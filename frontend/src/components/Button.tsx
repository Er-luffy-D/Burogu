import { Loader_Button } from "./loader";

interface button {
  text: string;
  onClick: () => void;
  variant?: "login" | "other";
  loading?: boolean;
}

export const Button = ({
  text,
  onClick,
  variant = "login",
  loading = false,
}: button) => {
  if (variant == "login") {
    return (
      <button
        className={`relative overflow-hidden border-2 w-full mt-2 border-green-400 text-white p-2 bg-gray-900 group ${
          loading ? "bg-green-400" : ""
        }`}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <span className="flex justify-center">
            <Loader_Button />
          </span>
        ) : (
          <>
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 bg-green-400 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>
          </>
        )}
      </button>
    );
  }
  if (variant == "other") {
    return (
      <button
        className={`relative overflow-hidden border-2 w-1/6 rounded-xl mt-2 border-blue-400 text-white p-2 bg-gray-900 group ${
          loading ? "bg-blue-400" : ""
        }`}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <span className="flex justify-center">
            <Loader_Button />
          </span>
        ) : (
          <>
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 bg-blue-400 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
          </>
        )}
      </button>
    );
  }
};
