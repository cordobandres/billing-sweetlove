import { useNavigate } from "react-router-dom"

export default function Topbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="h-14 bg-white border-b flex justify-end items-center px-4">
      <button
        onClick={logout}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Salir
      </button>
    </header>
  )
}
