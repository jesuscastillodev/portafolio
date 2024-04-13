import Header from "./components/Header";
function App() {
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="flex flex-col justify-between bg-blue-100 w-full items-center transition-colors duration-500">
          <div className="max-w-screen-lg w-full">
            <Header />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
