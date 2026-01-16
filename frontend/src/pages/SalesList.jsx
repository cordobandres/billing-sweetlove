import { useEffect, useState } from "react"
import { getSales } from "../api/sales"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

export default function SalesList() {
  const [sales, setSales] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    loadSales()
  }, [])

  const loadSales = async () => {
    const res = await getSales()
    setSales(res.data)
  }

  return (
    <div className="min-h-screen bg-[#E6E6FA]">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Ventas 💳</h2>

          <table className="w-full">
            <thead className="border-b text-gray-500 text-left">
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {sales.map(sale => (
                <tr key={sale.id} className="border-b">
                  <td>{sale.id}</td>
                  <td>{new Date(sale.date).toLocaleString()}</td>
                  <td>${sale.total}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/sales/${sale.id}`)}
                      className="text-pink-500 font-semibold"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </main>
    </div>
  )
}
