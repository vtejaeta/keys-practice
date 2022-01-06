import React, { useEffect, useState } from "react";
import { getTextForTyping } from "../utils/generateText";

function App() {
  let [mainPracticeText, setPracticeText] = useState("");
  let [entered, setEntered] = useState("");
  let [currentIndex, setCurrentIndex] = useState(1);
  let [temp, setTemp] = useState(0);

  let [options, setOptions] = useState({
    includeCapitals: false,
    includeNumbers: false,
    includeSpaces: false,
  });

  useEffect(() => {
    setPracticeText(getTextForTyping([], 250, options));
  }, [temp, options]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      e.target.value.slice(0, currentIndex) !==
      mainPracticeText.slice(0, currentIndex)
    )
      return;

    setCurrentIndex((prevIndex) => prevIndex + 1);
    setEntered(e.target.value);
  }

  function handleReset() {
    setTemp((t) => t + 1);
    setCurrentIndex(1);
    setEntered("");
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-8 p-5">
        <div className="w-1/2 flex flex-row justify-between items-center">
          <Button
            onClick={() =>
              setOptions((prevState) => ({
                ...prevState,
                includeCapitals: !prevState.includeCapitals,
              }))
            }
            text={`Capitals: ${options.includeCapitals ? `true` : `false`}`}
          />
          <Button
            onClick={() =>
              setOptions((prevState) => ({
                ...prevState,
                includeNumbers: !prevState.includeNumbers,
              }))
            }
            text={`Numbers: ${options.includeNumbers ? `true` : `false`}`}
          />
          <Button
            onClick={() =>
              setOptions((prevState) => ({
                ...prevState,
                includeSpaces: !prevState.includeSpaces,
              }))
            }
            text={`Spaces: ${options.includeSpaces ? `true` : `false`}`}
          />
        </div>
        <ul className="container leading-9 tracking-widest text-2xl break-words mx-auto py-4 flex flex-row flex-wrap">
          {mainPracticeText.split("").map((letter, index) => (
            <li
              key={index}
              className={`p-1 w-5 h-10 flex flex-row justify-center border-1 m-1 ${
                index == currentIndex - 1
                  ? "border-blue-500  border-2"
                  : "border"
              }`}
            >
              {letter}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row max-w-3xl justify-evenly">
        <input
          type="text"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative rounded text-sm border-2 focus:outline-none focus:ring w-2/4 ml-10"
          value={entered}
          onChange={handleInput}
        />
        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </>
  );
}

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default App;
