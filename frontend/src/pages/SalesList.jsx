import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/api"

export default function SalesList() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSales()
  }, [])

  const loadSales = async () => {
    try {
      const res = await api.get("/sales/")
      setSales(res.data)
    } catch (err) {
      console.error("Error cargando ventas", err)
    } finally {
      setLoading(false)
    }
  }

  const cancelSale = async (id) => {
    const confirm = window.confirm(
      "¿Seguro que deseas cancelar esta venta? Se devolverá el stock."
    )
    if (!confirm) return

    try {
      await api.patch(`/sales/${id}/cancel`)
      loadSales()
      alert("Venta cancelada correctamente ❌")
    } catch (err) {
      alert("Error cancelando la venta")
    }
  }

  if (loading) {
    return <p className="text-center">Cargando ventas...</p>
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Historial de Ventas 📄
      </h2>

      {sales.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-2">ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Items</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-b">
                <td className="py-2">{sale.id}</td>
                <td>
                  {new Date(sale.date).toLocaleString()}
                </td>
                <td className="font-semibold">
                  ${sale.total}
                </td>
                <td>{sale.items.length}</td>
                <td className="space-x-3">
                  <Link
                    to={`/sales/${sale.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver
                  </Link>

                  <button
                    onClick={() => cancelSale(sale.id)}
                    className="text-red-600 hover:underline"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
