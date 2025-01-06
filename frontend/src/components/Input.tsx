interface input {
  text: string;
  type: string;
  placeholder: string;
}

export const Input = ({ text, type, placeholder }: input) => {
  return (
    <div className="flex-col justify-between my-4 text-base sm:text-lg">
      <div className="font-semibold">{text}</div>
      <div>
        <input
          type={`${type}`}
          required
          placeholder={`${placeholder}`}
          className="w-full px-2 py-1 rounded-lg"
        />
      </div>
    </div>
  );
};
