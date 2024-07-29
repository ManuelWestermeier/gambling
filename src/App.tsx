import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import PageNotFlound from "./pages/404";
import AuthPage from "./pages/auth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<PageNotFlound />} />
    </Routes>
  );
}
