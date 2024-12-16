import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]); 
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = async (index, nextWord) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setResultData((prev) => prev + nextWord); 
        resolve();
      }, 75 * index); 
    });
  };

  const onSent = async (prompt) => {
    if (!prompt?.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    try {
      const response = await run(prompt);

      if (typeof response !== "string") {
        throw new Error("Invalid response format");
      }

    
      const responseArray = response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i]; 
        } else {
          newResponse += `<b>${responseArray[i]}</b>`; 
        }
      }


      let newResponseArray = newResponse.split(" ");


      let tempResult = "";
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        tempResult += nextWord + " ";
        setResultData(tempResult); 
      }

      setPrevPrompts((prev) => {
        if (!prev.includes(prompt)) {
          return [prompt, ...prev]; 
        }
        return prev;
      });

    } catch (error) {
      setResultData("An error occurred. Please try again.");
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }

    setInput(""); 
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider; 
