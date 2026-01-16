import Navbar from "../components/Navbar/"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold mb-2">
            Bienvenida 👋
          </h2>
          <p className="text-gray-500">
            Panel de gestión de inventario y ventas
          </p>
        </div>
      </main>
    </div>
  )
}
