import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Header from "./Components/header";
import Footer from "./Components/footer";
import AddNote from "./routes/Home/add-note";
import UpdateNote from "./routes/Home/note";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/note/:id" element={<UpdateNote />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
