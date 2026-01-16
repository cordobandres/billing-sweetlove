import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./auth/Login"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Sales from "./pages/Sales/"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
