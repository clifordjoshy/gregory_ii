import { useEffect, useRef, useState } from "react";
import words from "./words.json";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const ControlPanel = () => {
  const [currentWord, setCurrentWord] = useState(null);

  const onWordUpdate = (e) => {
    const text = e.target.value;

    const newWord = words.find((w) => w.word.startsWith(text));
    if (text && newWord) {
      setCurrentWord(newWord.word);
    } else {
      setCurrentWord(null);
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

    setCurrentWordStatus({
      completed: !!completedWords.find((w) => w === currentWord),
      confused: !!confusedWords.find((w) => w === currentWord),
      forgotten: !!forgottenWords.find((w) => w === currentWord),
    });
  }, [currentWord]);

  const onReset = (word) => {
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

  const onExport = () => {
    const content = {
      completed: JSON.parse(localStorage.getItem("completed") || "[]"),
      confused: JSON.parse(localStorage.getItem("confused") || "[]"),
      forgotten: JSON.parse(localStorage.getItem("forgotten") || "[]"),
    };

    const contentText = JSON.stringify(content);

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(contentText)
    );
    element.setAttribute("download", "words.txt");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const inputFile = useRef(null);
  const onImport = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const { completed, confused, forgotten } = JSON.parse(reader.result);

      localStorage.setItem("confused", JSON.stringify(confused));
      localStorage.setItem("forgotten", JSON.stringify(forgotten));
      localStorage.setItem("completed", JSON.stringify(completed));
      alert("success");
    };

    reader.readAsText(file);
  };

  const onClearForgotten = () => {
    const confusedWords = JSON.parse(localStorage.getItem("confused") || "[]");

    localStorage.setItem("forgotten", JSON.stringify(confusedWords));

    alert("forgotten words reset");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        width: "80vw",
        maxWidth: "30em",
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
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
            padding: "0 3px",
          }}
        >
          <Button style={{ flexGrow: 1 }} onClick={onExport}>
            Export
          </Button>
          <Button
            style={{ flexGrow: 1 }}
            onClick={() => inputFile.current.click()}
          >
            Import
          </Button>

          <input
            type="file"
            id="file"
            accept=".txt"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={(event) => onImport(event.target.files[0])}
          />
        </div>

        <Button
          style={{ width: "100%" }}
          variant="warning"
          onClick={onClearForgotten}
        >
          Clear Forgotten
        </Button>

        <Form.Group>
          <Form.Label>Word Config</Form.Label>

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
              <Card.Text>
                Completed: {currentWordStatus.completed.toString()}
                <br />
                Confused: {currentWordStatus.confused.toString()}
                <br />
                Forgotten: {currentWordStatus.forgotten.toString()}
              </Card.Text>

              <Button
                variant="danger"
                onClick={() => onReset(currentWord)}
                disabled={!currentWordStatus.completed}
              >
                RESET
              </Button>
            </Card>
          )}
        </Form.Group>
      </div>
    </div>
  );
};

export default ControlPanel;
