import { useState } from "react"
import api from "../api/api"

export default function ProductEditForm({ product, onClose, onSaved }) {
  const [stock, setStock] = useState(product.stock)
  const [price, setPrice] = useState(product.price)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await api.patch(`/products/${product.id}`, {
      stock,
      price,
    })

    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h3 className="text-lg font-semibold mb-4">
          Editar producto
        </h3>

        <label className="block mb-2">
          Stock
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Precio
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500"
          >
            Cancelar
          </button>
          <button
            className="bg-[#F2C6D8] text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
