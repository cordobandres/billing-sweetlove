import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar/"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products")
      setProducts(res.data)
    } catch (err) {
      console.error("Error cargando productos", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Inventario</h2>

          <button className="bg-[#F2C6D8] text-white px-4 py-2 rounded-lg">
            + Nuevo producto
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Cargando...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">${p.price}</td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3 space-x-2">
                      <button className="text-blue-500">Editar</button>
                      <button className="text-red-500">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
