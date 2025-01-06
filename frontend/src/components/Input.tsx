import { ChangeEvent } from "react";

interface input {
  text: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ text, type, placeholder, onChange }: input) => {
  return (
    <div className="flex-col justify-between my-4 text-base sm:text-lg">
      <label htmlFor={text} className="block mb-2 font-semibold text-gray-900 ">
        {text}
      </label>
      <div>
        <input
          type={type || "text"}
          id={text}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};
