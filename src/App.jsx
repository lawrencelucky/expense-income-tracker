import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </div>
  );
}

export default App;
