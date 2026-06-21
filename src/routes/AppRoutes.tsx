import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import UserPage from "../pages/UserPage";
import ProdiPage from "../pages/ProdiPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* login page */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/pengguna"
          element={
            <Layout>
              <UserPage />
            </Layout>
          }
        />

        <Route
          path="/prodi"
          element={
            <Layout>
              <ProdiPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
