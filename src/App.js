import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NewWords from "./NewWords";
import ConfusedWords from "./ConfusedWords";
import ForgottenWords from "./ForgottenWords";
import ControlPanel from "./ControlPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewWords />} />
        <Route path="/confused" element={<ConfusedWords />} />
        <Route path="/forgotten" element={<ForgottenWords />} />
        <Route path="/control" element={<ControlPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
