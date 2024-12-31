import Editor from "./components/Editor";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Text-Editor
        </h1>
        <Editor />
      </div>
    </div>
  );
}

export default App;
