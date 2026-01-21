import { useEffect, useState } from "react"
import api from "../api/api"

export default function Reports() {
  const [topProducts, setTopProducts] = useState([])
  const [byCategory, setByCategory] = useState([])

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      const [topRes, categoryRes] = await Promise.all([
        api.get("/reports/top-products"),
        api.get("/reports/by-category"),
      ])

      setTopProducts(topRes.data || [])
      setByCategory(categoryRes.data || [])
    } catch (err) {
      console.error("Error cargando reportes", err)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reportes 📊</h1>

      {/* TOP PRODUCTS */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">
          🔥 Productos más vendidos
        </h2>

        {topProducts.length === 0 ? (
          <p className="text-gray-500">No hay datos</p>
        ) : (
          <ul className="list-disc ml-6">
            {topProducts.map((p, i) => (
              <li key={i}>
                {p.name} — <strong>{p.quantity}</strong> unidades
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* BY CATEGORY */}
      <section>
        <h2 className="text-lg font-semibold mb-2">
          📦 Ventas por categoría
        </h2>

        {byCategory.length === 0 ? (
          <p className="text-gray-500">No hay datos</p>
        ) : (
          <ul className="list-disc ml-6">
            {byCategory.map((c, i) => (
              <li key={i}>
                {c.category} — <strong>${c.total}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
