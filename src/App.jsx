import Header from "./components/Header";
import Footer from "./components/Footer";
import { useTheme } from "./context/ThemeContext";
import AboutMe from "./components/AboutMe";
function App() {
  const { darkMode } = useTheme();
  return (
    <>
      <div
        className={`relative w-full overflow-hidden ${darkMode ? "dark" : ""}`}
      >
        <div className="flex flex-col justify-between bg-blue-100 w-full items-center transition-colors duration-500 dark:bg-[#0c1d55] dark:text-gray-300">
          <div className="max-w-screen-lg w-full min-h-screen">
            <Header />
            <div className="flex flex-col w-full">
                <AboutMe />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
