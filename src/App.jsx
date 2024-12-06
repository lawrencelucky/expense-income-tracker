import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import Member from "./pages/Member/Member";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/members" element={<Member />} />
      </Routes>
    </div>
  );
}

export default App;
