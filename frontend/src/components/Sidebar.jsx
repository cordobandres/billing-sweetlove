import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-[#E6E6FA] border-r p-4">
      {/* LOGO */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Sweet Love" className="sidebar-logo" />
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-3 text-sm font-medium">
        <Link to="/" className="hover:text-pink-500">Inicio</Link>
        <Link to="/products" className="hover:text-pink-500">Inventario</Link>
        <Link to="/sales" className="hover:text-pink-500">Ventas</Link>
        <Link to="/sales/list" className="hover:text-pink-500">Historial</Link>
        <Link to="/reports" className="hover:text-pink-500">Reportes</Link>
      </nav>
    </aside>
  )
}
