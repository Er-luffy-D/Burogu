import { useMemo } from "react";
import { quotes } from "../data/quotes";

export const Quote = () => {
  const randomQuote = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }, []);

  return (
    <div className="bg-slate-300 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">{randomQuote.content}</div>
          <div className="max-w-md text-xl font-semibold text-left mt-4">
            {randomQuote.author}
          </div>
          <div className="max-w-md text-base font-light text-slate-600">
            {randomQuote.company}
          </div>
        </div>
      </div>
    </div>
  );
};
