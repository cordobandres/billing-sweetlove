import { useState } from "react"
import api from "../api/api"

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    category: "PAJAMA",
    size: "M",
    color: "",
    stock: 0,
    price: 0,
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post("/products", form)
    onCreated()
    setForm({
      name: "",
      category: "PAJAMA",
      size: "M",
      color: "",
      stock: 0,
      price: 0,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 mb-6"
    >
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      >
        <option value="PAJAMA">Pijama</option>
        <option value="BASIC_LINGERIE">Lencería básica</option>
        <option value="LIGUER">Ligueros</option>
        <option value="CROP_TOP">Crop Top</option>
        <option value="BODY">Body</option>
      </select>

      <select
        name="size"
        value={form.size}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      >
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      <input
        name="color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
        required
      />

      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      />

      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        className="border px-3 py-2 rounded"
      />

      <button
        className="col-span-2 bg-[#F2C6D8] text-white py-2 rounded-lg font-semibold"
      >
        Crear producto
      </button>
    </form>
  )
}
