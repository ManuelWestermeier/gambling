import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import PageNotFlound from "./pages/404";
import AuthPage from "./pages/auth";
import HeadOrTailsPage from "./pages/play/head-or-tails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/play/head-or-tails" element={<HeadOrTailsPage />} />
      <Route path="*" element={<PageNotFlound />} />
    </Routes>
  );
}
