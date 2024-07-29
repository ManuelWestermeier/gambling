import { HashRouter, Route, Routes } from "react-router-dom";
import ClientProvider from "./contexts/wsnet-client";
import HomePage from "./pages/home";
import PageNotFlound from "./pages/404";
import AuthPage from "./pages/auth";
import AuthProvider from "./contexts/auth";

export default function App() {
  return (
    <ClientProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<PageNotFlound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ClientProvider>
  );
}
