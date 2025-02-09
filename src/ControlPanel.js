import { useEffect, useState } from "react";
import words from "./words.json";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const SettingsRow = ({ setting, status, onReset }) => {
  return (
    <>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flexGrow: 2, height: "100%", alignContent: "center" }}>
          {setting}: {status.toString()}
        </div>
        <Button
          disabled={!status}
          variant="danger"
          style={{ flexGrow: 1 }}
          onClick={onReset}
        >
          RESET
        </Button>
      </div>
    </>
  );
};

const ControlPanel = () => {
  const [currentWord, setCurrentWord] = useState(null);

  const onWordUpdate = (e) => {
    const text = e.target.value;

    const newWord = words.find((w) => w.word.startsWith(text));
    if (newWord && currentWord !== newWord.word) {
      setCurrentWord(newWord.word);
    }
  };

  const [currentWordStatus, setCurrentWordStatus] = useState(null);

  useEffect(() => {
    const completedWords = JSON.parse(
      localStorage.getItem("completed") || "[]"
    );
    const confusedWords = JSON.parse(localStorage.getItem("confused") || "[]");
    const forgottenWords = JSON.parse(
      localStorage.getItem("forgotten") || "[]"
    );
    console.log(completedWords);
    console.log(confusedWords);
    console.log(forgottenWords);

    setCurrentWordStatus({
      completed: !!completedWords.find((w) => w === currentWord),
      confused: !!confusedWords.find((w) => w === currentWord),
      forgotten: !!forgottenWords.find((w) => w === currentWord),
    });
  }, [currentWord]);

  const onReset = (word, what) => {
    let completedWords = JSON.parse(localStorage.getItem("completed") || "[]");
    let confusedWords = JSON.parse(localStorage.getItem("confused") || "[]");
    let forgottenWords = JSON.parse(localStorage.getItem("forgotten") || "[]");

    completedWords = completedWords.filter((w) => w !== word);
    confusedWords = confusedWords.filter((w) => w !== word);
    forgottenWords = forgottenWords.filter((w) => w !== word);

    localStorage.setItem("confused", JSON.stringify(confusedWords));
    localStorage.setItem("forgotten", JSON.stringify(forgottenWords));
    localStorage.setItem("completed", JSON.stringify(completedWords));

    setCurrentWordStatus({
      completed: false,
      confused: false,
      forgotten: false,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          maxWidth: "30em",
        }}
      >
        <Form.Control
          type="text"
          onChange={onWordUpdate}
          placeholder="Enter a word"
        />
        {currentWord && (
          <Card
            style={{
              padding: "10px",
            }}
          >
            <Card.Title>{currentWord}</Card.Title>
            <SettingsRow
              setting={"Completed"}
              status={currentWordStatus.completed}
              onReset={() => onReset(currentWord, "completed")}
            />{" "}
            <SettingsRow
              setting={"Confused"}
              status={currentWordStatus.completed}
              onReset={() => onReset(currentWord, "confused")}
            />{" "}
            <SettingsRow
              setting={"Forgotten"}
              status={currentWordStatus.completed}
              onReset={() => onReset(currentWord, "forgotten")}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
