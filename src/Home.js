import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Button onClick={() => navigate("/new")}>New Words</Button>
      </div>
      <div>
        <Button onClick={() => navigate("/confused")}>Confused Words</Button>
      </div>
      <div>
        <Button onClick={() => navigate("/forgotten")}>Forgotten Words</Button>
      </div>
    </div>
  );
};

export default Home;
