import api from "./api"

export const getTopProducts = () => api.get("/reports/top-products")
export const getSalesByCategory = () => api.get("/reports/by-category")
export const getSalesByMonth = () => api.get("/reports/by-month")
export const getSalesBySize = () => api.get("/reports/by-size")
export const getSalesByColor = () => api.get("/reports/by-color")
