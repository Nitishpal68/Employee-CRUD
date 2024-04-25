import logo from "./logo.svg";
import "./App.css";
import List from "./Component/pages/List";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { View } from "./Component/pages/View";
import { Update } from "./Component/pages/update";
import { Home } from "./Component/Employee/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/View/:id" element={<View />} />
          <Route exact path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
