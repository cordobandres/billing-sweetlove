import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-[#F2C6D8]">
        Sweet Love
      </h1>

      <div className="flex gap-6 items-center">
        <button onClick={() => navigate("/")} className="text-gray-600">
          Inicio
        </button>
        <button onClick={() => navigate("/products")} className="text-gray-600">
          Inventario
        </button>
        <button onClick={() => navigate("/sales")} className="text-gray-600">
          Ventas
        </button>
        <button
          onClick={logout}
          className="text-sm text-red-400"
        >
          Salir
        </button>
      </div>
    </nav>
  )
}
