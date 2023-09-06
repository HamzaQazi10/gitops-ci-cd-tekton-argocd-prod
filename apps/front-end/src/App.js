import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Results from "./components/Results";

function App() {
  /* 
  This contains my routes that I have defined using react-router-dom. It helps me in handling the api's and
  passing on details to different pages
  */
  return (
    // <FrontPage />
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />} />
        <Route exact path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
