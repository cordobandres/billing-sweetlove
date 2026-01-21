import { useState } from "react"
import api from "../api/api"

export default function ProductEditForm({ product, onClose, onSaved }) {
  const [form, setForm] = useState(product)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.put(`/products/${product.id}`, form)
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96 space-y-3"
      >
        <h2 className="font-semibold">Editar producto</h2>

        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button className="bg-pink-400 text-white px-4 py-1 rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
