import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar/"
import ProductForm from "../components/ProductForm"
import ProductEditForm from "../components/ProductEditForm"


const handleDelete = async (id) => {
  const confirm = window.confirm("¿Eliminar este producto?")
  if (!confirm) return

  await api.delete(`/products/${id}`)

  // 🔥 reload inmediato y garantizado
  window.location.reload()
}



export default function Products() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const res = await api.get("/products")
    setProducts(res.data)
  }

  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Inventario 🛍️
          </h2>

          {/* Crear producto */}
          <ProductForm onCreated={fetchProducts} />

          {/* Tabla de productos */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2">Nombre</th>
                <th>Categoría</th>
                <th>Talla</th>
                <th>Color</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.size}</td>
                  <td>{p.color}</td>
                  <td>{p.stock}</td>
                  <td>${p.price}</td>
                  <td className="space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditing(p)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar
                    </button>


                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal editar */}
      {editing && (
        <ProductEditForm
          product={editing}
          onClose={() => setEditing(null)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  )
}
