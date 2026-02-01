import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dento Nutrition</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default App;

