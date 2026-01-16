import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSaleById } from "../api/sales"
import Navbar from "../components/Navbar"

export default function SaleDetail() {
  const { id } = useParams()
  const [sale, setSale] = useState(null)

  useEffect(() => {
    loadSale()
  }, [])

  const loadSale = async () => {
    const res = await getSaleById(id)
    setSale(res.data)
  }

  if (!sale) return null

  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Factura 🧾 #{sale.id}
          </h2>

          <p className="text-gray-500 mb-4">
            Fecha: {new Date(sale.date).toLocaleString()}
          </p>

          <table className="w-full mb-6">
            <thead className="border-b text-left">
              <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {sale.items.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>${item.unit_price}</td>
                  <td>${item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-right">
            Total: ${sale.total}
          </h3>

          <button
            onClick={() => window.print()}
            className="mt-6 bg-[#F2C6D8] px-4 py-2 rounded font-semibold"
          >
            Imprimir factura
          </button>
        </div>
      </main>
    </div>
  )
}
