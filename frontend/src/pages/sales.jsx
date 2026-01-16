import { useEffect, useState } from "react"
import { getProducts } from "../api/products"
import { createSale } from "../api/sales"
import Navbar from "../components/Navbar/"

export default function Sales() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const res = await getProducts()
    setProducts(res.data)
  }

  const handleSale = async (e) => {
    e.preventDefault()

    await createSale({
      items: [{ product_id: productId, quantity }]
    })

    alert("Venta registrada ✅")
    setQuantity(1)
  }

  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Registrar Venta</h2>

        <form
          onSubmit={handleSale}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecciona producto</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-[#F2C6D8] py-2 rounded font-semibold">
            Registrar Venta
          </button>
        </form>
      </main>
    </div>
  )
}
