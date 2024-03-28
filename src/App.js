import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/main";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";

// import the components in the above section
function App() {
  // Adding the components here
  return (
    <div className="app flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
