import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Landing from "./views/Landing";
import Document from "./views/Document";
// import useData from "./utils/useData";

const App = () => {
  // useData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs/:path" element={<Document />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
