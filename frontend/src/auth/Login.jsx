import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const formData = new URLSearchParams()
      formData.append("username", username)
      formData.append("password", password)

      const response = await api.post("/auth/login", formData)

      // 🔑 ESTO ES CLAVE
      const { access_token } = response.data

      if (!access_token) {
        throw new Error("No token received")
      }

      localStorage.setItem("token", access_token)
      navigate("/")

    } catch (err) {
      console.error(err)
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E6E6FA]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Sweet Love 💜
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
          required
        />

        <button className="w-full bg-[#F2C6D8] text-white py-2 rounded-lg font-semibold">
          Entrar
        </button>
      </form>
    </div>
  )
}
