import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import GraphPage from "@/pages/graph";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<GraphPage />} path="/graph" />
    </Routes>
  );
}

export default App;
