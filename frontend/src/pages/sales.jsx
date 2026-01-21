import { useEffect, useState } from "react"
import api from "../api/api"

export default function Sales() {
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const res = await api.get("/products/")
    setProducts(res.data)
  }

  const addToCart = () => {
    if (!productId) return

    const product = products.find(p => p.id === Number(productId))
    if (!product) return

    setCart(prev => {
      const exists = prev.find(i => i.product_id === product.id)

      if (exists) {
        return prev.map(i =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }

      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        }
      ]
    })

    setProductId("")
    setQuantity(1)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.product_id !== id))
  }

  const confirmSale = async () => {
    if (cart.length === 0) return

    try {
      setLoading(true)

      await api.post("/sales/", {
        items: cart.map(i => ({
          product_id: i.product_id,
          quantity: i.quantity,
        }))
      })

      alert("✅ Venta registrada correctamente")
      setCart([])
      loadProducts()

    } catch (err) {
      alert("❌ Error al registrar la venta")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const total = cart.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  )

  return (
    <div>
      <h2>Registrar venta</h2>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
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
      />

      <button onClick={addToCart}>
        Agregar al carrito
      </button>

      {cart.length > 0 && (
        <>
          <h3>Resumen</h3>
          {cart.map(item => (
            <div key={item.product_id}>
              {item.name} × {item.quantity} — ${item.price * item.quantity}
              <button onClick={() => removeFromCart(item.product_id)}>✕</button>
            </div>
          ))}

          <p><strong>Total:</strong> ${total}</p>

          <button onClick={confirmSale} disabled={loading}>
            {loading ? "Procesando..." : "Confirmar venta"}
          </button>
        </>
      )}
    </div>
  )
}
