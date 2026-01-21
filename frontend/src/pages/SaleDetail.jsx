import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/api"

export default function SaleDetail() {
  const { id } = useParams()
  const [sale, setSale] = useState(null)

  useEffect(() => {
    loadSale()
  }, [])

  const loadSale = async () => {
    const res = await api.get(`/sales/${id}`)
    setSale(res.data)
  }

  if (!sale) return null

  return (
    <div>
      <h2>Factura #{sale.id}</h2>
      <p>Fecha: {new Date(sale.date).toLocaleString()}</p>

      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {sale.items.map((item, i) => (
            <tr key={i}>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>${item.unit_price}</td>
              <td>${item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${sale.total}</h3>

      <button onClick={() => window.print()}>
        Imprimir
      </button>
    </div>
  )
}
