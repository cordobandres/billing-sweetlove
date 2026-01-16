import api from "./api"

export const createSale = (data) => {
  return api.post("/sales/", data)
}

export const getSales = () => {
  return api.get("/sales/")
}

export const getSaleById = (id) => {
  return api.get(`/sales/${id}`)
}

export const cancelSale = (id) => {
  return api.patch(`/sales/${id}/cancel`)
}
