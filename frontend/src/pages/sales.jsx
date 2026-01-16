import { useEffect, useState } from "react"
import api from "../api/api"
import Navbar from "../components/Navbar"

export default function Sales() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const [lastSale, setLastSale] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const res = await api.get("/products")
    setProducts(res.data)
  }

  // ➕ Agregar producto al carrito
  const addToCart = () => {
    if (!productId) return

    const product = products.find(p => p.id === Number(productId))
    if (!product) return

    setCart(prev => {
      const existing = prev.find(i => i.product_id === product.id)

      if (existing) {
        return prev.map(i =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + Number(quantity) }
            : i
        )
      }

      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: Number(quantity),
        }
      ]
    })

    setQuantity(1)
    setProductId("")
  }

  // ❌ Quitar producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.product_id !== id))
  }

  // ✅ Confirmar venta
  const confirmSale = async () => {
    if (cart.length === 0) return

    const res = await api.post("/sales/", {
      items: cart.map(i => ({
        product_id: i.product_id,
        quantity: i.quantity
      }))
    })

    setLastSale(res.data)
    setCart([])
    alert("Venta registrada correctamente 🧾")
    loadProducts()
  }

  const total = cart.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 space-y-6">

        {/* FORMULARIO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Registrar venta 🛒
          </h2>

          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border p-2 rounded mb-3"
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
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded mb-3"
          />

          <button
            type="button"
            onClick={addToCart}
            className="w-full bg-[#F2C6D8] py-2 rounded font-semibold"
          >
            Agregar al carrito
          </button>
        </div>

        {/* CARRITO */}
        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Resumen de la venta</h3>

            {cart.map(item => (
              <div
                key={item.product_id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span className="flex gap-3">
                  ${item.price * item.quantity}
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button
              onClick={confirmSale}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded font-semibold"
            >
              Confirmar venta
            </button>
          </div>
        )}

        {/* FACTURA */}
        {lastSale && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">
              Factura 🧾
            </h3>

            <p>ID: {lastSale.id}</p>
            <p>Fecha: {new Date(lastSale.date).toLocaleString()}</p>

            <ul className="my-3">
              {lastSale.items.map((i, idx) => (
                <li key={idx}>
                  Producto #{i.product_id} — {i.quantity} × ${i.unit_price}
                </li>
              ))}
            </ul>

            <p className="font-bold">Total: ${lastSale.total}</p>
          </div>
        )}
      </main>
    </div>
  )
}