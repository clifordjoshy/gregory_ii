import { useCallback, useEffect, useState } from "react";
import words from "./words.json";
import Word from "./Word";
import { shuffle } from "./util";

const DEFAULT = [{ word: "no forgotten words", description: "x" }];
const ForgottenWords = () => {
  const [pendingWords, setPendingWords] = useState(DEFAULT);

  useEffect(() => {
    const forgottenWords = JSON.parse(
      localStorage.getItem("forgotten") || "[]"
    );
    if (forgottenWords.length) {
      const pWords = words.filter((pw) =>
        forgottenWords.find((cw) => pw.word === cw)
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

      if (pendingWords.length === 1) {
        setPendingWords(DEFAULT);
      } else {
        setPendingWords(pendingWords.slice(1));
      }

      if (status === "success") {
        let forgottenWords = JSON.parse(
          localStorage.getItem("forgotten") || "[]"
        );
        forgottenWords = forgottenWords.filter((w) => w !== word);
        localStorage.setItem("forgotten", JSON.stringify(forgottenWords));
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

export default ForgottenWords;
