import React, { useEffect, useState } from "react";
import { fetchAdvice } from "./utils";

const App = () => {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState("Don't waste food.");
  const [isLoading, setIsLoading] = useState(false);
  const screen = window.screen.width;
  // Function that types out received chunks character by character
  const streamText = async (text, callback) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      const chart = text[currentIndex] == undefined ? "" : text[currentIndex];

      callback((prev) => prev + chart);
      if (currentIndex > text.length) {
        clearInterval(interval);
      }
      currentIndex++;
    }, 120);
  };

  const generateAdvice = async () => {
    try {
      setIsLoading(true);
      const { slip } = await fetchAdvice();
      setAdvice(""); // Reset the advice before streaming new text
      setId(slip.id);
      streamText(slip.advice, setAdvice);
    } catch (error) {
      console.error("Something went wrong!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center h-[90vh] mx-auto">
      <div className="box h-fit px-3 py-14 rounded-lg w-[400px] relative bg-[#313a49]">
        <div className="w-full h-full flex justify-center items-center flex-col gap-8 text-center">
          <h2 className="text-center text-[#14e88c] font-bold uppercase">
            advice #{id}
          </h2>
          {isLoading && (
            <img
              className="text-[#14e88c] animate-spin duration-500"
              src="/images/icon-load.svg"
            />
          )}
          <p className="text-[#cee3e8] font-Manrope font-semibold text-[28px] line-clamp-4">
            <q>{advice}</q>
          </p>
          <img
            className={`${screen < 375 ? "hidden" : ""}`}
            src={`/images/pattern-divider-${
              screen < 375 ? "mobile" : "desktop"
            }.svg`}
            srcSet=""
            alt=""
          />
        </div>
        <div
          onClick={() => generateAdvice()}
          className="w-[80px] translate-x-[-50%] left-[50%] top-[86%] flex justify-center items-center absolute h-[80px] cursor-pointer hover:scale-75 group duration-300 hover:opacity-75 rounded-full bg-[#14e88c]"
        >
          <img
            className="w-[40%] group-hover:animate-spin duration-700 "
            src="/images/icon-dice.svg"
            alt="Dice icon"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
