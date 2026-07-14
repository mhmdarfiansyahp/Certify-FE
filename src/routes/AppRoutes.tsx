import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import UserPage from "../pages/UserPage";
import ProdiPage from "../pages/ProdiPage";
import SertifikasiPage from "../pages/SertifikasiPage";
import AsesmenPage from "../pages/AsesmenPage";
import ProtectedRoute from "./ProtectedRoute";
import StatusKompetensiPage from "../pages/StatusKompetensiPage";
import ProfilePage from "../pages/ProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "instruktur"]}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "instruktur", "mahasiswa"]}>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={["admin", "instruktur", "mahasiswa"]}>
              <Layout>
                <ChangePasswordPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/prodi"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <ProdiPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sertifikasi"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <SertifikasiPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pengguna"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Layout>
                <UserPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/asesmen"
          element={
            <ProtectedRoute allowedRoles={["instruktur"]}>
              <Layout>
                <AsesmenPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/status-kompetensi"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <Layout>
                <StatusKompetensiPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
