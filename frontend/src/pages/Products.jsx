import { useEffect, useState } from "react"
import api from "../api/api"
import ProductForm from "../components/ProductForm"
import ProductEditForm from "../components/ProductEditForm"

export default function Products() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)

  const fetchProducts = async () => {
    const res = await api.get("/products")
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return
    await api.delete(`/products/${id}`)
    fetchProducts()
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Inventario 🛍️</h2>

      <ProductForm onCreated={fetchProducts} />

      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-600 border-b">
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b">
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>${p.price}</td>
              <td className="space-x-3">
                <button onClick={() => setEditing(p)} className="text-blue-600">
                  Editar
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
