interface button {
  text: string;
}

export const Button = ({ text }: button) => {
  return (
    <button
      type="submit"
      className="relative overflow-hidden border-2 w-full border-green-400 text-white p-2 bg-gray-900 group "
    >
      <span className="relative group group-hover:underline group-hover:text-slate-800 z-10">{text}</span>
      <span className="absolute inset-0 bg-green-400 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:border-black"></span>
    </button>
  );
};
