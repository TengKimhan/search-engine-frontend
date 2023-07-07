import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadFile from "./UploadFile";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/upload-file" element={<UploadFile/>} />
      </Routes>
    </Router>
  )
}

export default App;
