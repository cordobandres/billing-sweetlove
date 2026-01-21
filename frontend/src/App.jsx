import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./auth/Login"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Sales from "./pages/Sales"
import SalesList from "./pages/SalesList"
import SaleDetail from "./pages/SaleDetail"
import Reports from "./pages/Reports"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/list" element={<SalesList />} />
          <Route path="/sales/:id" element={<SaleDetail />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
