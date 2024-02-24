import "./App.css";
import Contact from "./ui/Contact";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import WordInput from "./ui/WordInput";

function App() {
  return (
    <div className="App">
      <Header />
      <WordInput />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
