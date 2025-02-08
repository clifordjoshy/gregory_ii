import { useCallback, useEffect, useState } from "react";
import words from "./words.json";
import Word from "./Word";
import { shuffle } from "./util";

const DEFAULT = [{ word: "no more new words", description: "x" }];
const NewWords = () => {
  const [pendingWords, setPendingWords] = useState([
    { word: "loading", description: "x" },
  ]);

  useEffect(() => {
    const completedWords = JSON.parse(
      localStorage.getItem("completed") || "[]"
    );
    const pWords = words.filter(
      (pw) => !completedWords.find((cw) => pw.word === cw)
    );
    if (pWords.length) {
      shuffle(pWords);
      setPendingWords(pWords);
    } else {
      setPendingWords(DEFAULT);
    }
  }, []);

  const markWord = useCallback(
    (word, status) => {
      if (word === DEFAULT.word) {
        return;
      }

      if (pendingWords.length === 1) {
        setPendingWords([{ word: "all words complete", description: "x" }]);
      } else {
        setPendingWords(pendingWords.slice(1));
      }

      if (status === "success") {
      } else if (status === "failure") {
        const confused = JSON.parse(localStorage.getItem("confused") || "[]");
        const forgotten = JSON.parse(localStorage.getItem("forgotten") || "[]");

        confused.push(word);
        forgotten.push(word);

        localStorage.setItem("confused", JSON.stringify(confused));
        localStorage.setItem("forgotten", JSON.stringify(forgotten));
      }
    },
    [pendingWords]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Word word={pendingWords[0]} markWord={markWord} />
    </div>
  );
};

export default NewWords;
