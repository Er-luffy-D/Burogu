interface button {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: button) => {
  return (
    <button
      className="relative overflow-hidden border-2 w-full mt-2 border-green-400 text-white p-2 bg-gray-900 group"
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 bg-green-400 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
    </button>
  );
};
