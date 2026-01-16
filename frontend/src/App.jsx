import { Routes, Route, Navigate } from "react-router-dom"

import Login from "./auth/Login"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Sales from "./pages/Sales/"
import SalesList from "./pages/SalesList/"
import SaleDetail from "./pages/SaleDetail"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/list" element={<SalesList />} />
        <Route path="/sales/:id" element={<SaleDetail />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
