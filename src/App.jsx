import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import "./App.css"
import Login from "./pages/Login"
import Activos from "./pages/Activos";
import Dassboar from "./pages/Dassboar";
import DashboardContent from "./component/DashboardContent";
import OrdeDetrabajo from "./pages/OrdeDetrabajo";
import ReporteFallas from "./pages/ReporteFallas";
import CrearReporteFallas from "./component/ComponentesFallas/CrearReporteFallas";
import Administracion from "./pages/Administracion";

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD COMO LAYOUT */}
      <Route 
        path="/dassboar" 
        element={isAuthenticated ? <Dassboar /> : <Navigate to="/login" />}
      >

        {/* 🔥 CONTENIDO INICIAL */}
        <Route path="" element={<DashboardContent />} />

        {/* 🔥 ACTIVOS DENTRO DEL DASHBOARD */}
        <Route path="activos" element={<Activos />} />

        {/* 🔥 ORDEN DE TRABAJO DENTRO DEL DASHBOARD */}
        <Route path="OrdeDetrabajo" element={<OrdeDetrabajo />} />

        {/* 🔥 REPORTE DE FALLAS DENTRO DEL DASHBOARD */}
        <Route path="ReporteFallas" element={<ReporteFallas />} />

        {/* 🔥 CREAR REPORTE DE FALLAS DENTRO DEL DASHBOARD */}
        <Route path="CrearReporteFallas" element={<CrearReporteFallas />} />

        {/* 🔥 CREAR REPORTE DE ADMINISTRACION DEL DASHBOARD */}
        <Route path="Administracion" element={<Administracion />} />

      </Route>

      {/* REDIRECCIÓN */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? <Navigate to="/dassboar" /> 
            : <Navigate to="/login" />

        } 
      />

    </Routes>
  );
}


export default function App() {
    return (
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    )
}
