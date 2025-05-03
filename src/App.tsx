import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import LoginPage from "@/pages/login";
import SignUpPage from "@/pages/sign-up";
import SignUpCompanyPage from "@/pages/sign-up-company";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignUpPage />} path="/sign-up" />
      <Route element={<SignUpCompanyPage />} path="/sign-up-company" />
    </Routes>
  );
}

export default App;
