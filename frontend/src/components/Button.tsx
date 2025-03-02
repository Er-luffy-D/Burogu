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
        className="group relative h-12 overflow-hidden hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2 overflow-x-hidden rounded-md bg-neutral-950 px-8 py-2 text-neutral-50 mt-2"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <span className="relative z-10">
            <Loader_Button />
          </span>
        ) : (
          <>
            <span className="relative z-10 ">{text}</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-green-400 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
            </span>
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
