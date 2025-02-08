import { useState } from "react";
import { Button, Card } from "react-bootstrap";

const Word = ({ word, markWord }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Card
      style={{
        width: "80%",
        maxWidth: "30em",
        padding: "10px",
        maxHeight: "90%",
        overflowY: "scroll",
      }}
    >
      <Card.Title>{word.word}</Card.Title>

      <Button
        variant="primary"
        style={{ marginTop: "10px", marginBottom: "10px" }}
        onClick={() => setShowDescription(true)}
      >
        SHOW
      </Button>
      {showDescription && (
        <Card.Text
          dangerouslySetInnerHTML={{ __html: word.description }}
          style={{ marginTop: "10px" }}
        ></Card.Text>
      )}

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <Button
          variant="danger"
          style={{ flexGrow: 1 }}
          onClick={() => {
            setShowDescription(false);
            markWord(word.word, "failure");
          }}
        >
          NOPE
        </Button>
        <Button
          variant="success"
          style={{ flexGrow: 1 }}
          onClick={() => {
            setShowDescription(false);
            markWord(word.word, "success");
          }}
        >
          GOT IT
        </Button>
      </div>
    </Card>
  );
};

export default Word;
