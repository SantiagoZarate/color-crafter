import { Route, Routes } from "react-router-dom";
import { ImageColorsPage } from "./pages";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/home/HomePage";
import { ToolLayout } from "./layouts/ToolLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<ToolLayout />}>
          <Route path="/predominant-colors" element={<ImageColorsPage />} />
          <Route path="/tailwind-translate" element={<ImageColorsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
