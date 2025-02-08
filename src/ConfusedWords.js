import { useCallback, useEffect, useState } from "react";
import words from "./words.json";
import Word from "./Word";
import { shuffle } from "./util";

const DEFAULT = [{ word: "no pending words", description: "x" }];
const ConfusedWords = () => {
  const [pendingWords, setPendingWords] = useState(DEFAULT);

  useEffect(() => {
    const confusedWords = JSON.parse(localStorage.getItem("confused") || "[]");
    if (confusedWords.length) {
      const pWords = words.filter((pw) =>
        confusedWords.find((cw) => pw.word === cw)
      );
      shuffle(pWords);
      setPendingWords(pWords);
    }
  }, []);

  const markWord = useCallback(
    (word, status) => {
      if (word === DEFAULT.word) {
        return;
      }

      if (pendingWords.length > 1) {
        setPendingWords(pendingWords.slice(1));
      } else {
        setPendingWords(DEFAULT);
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

export default ConfusedWords;
