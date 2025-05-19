import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();

  return (
    <div
      className="bg-base-200 min-h-screen transition-colors duration-300"
      data-theme={theme}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
