from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database.database import engine, Base
from backend.app.database import models          # Product
from backend.app.database import sales_models    # Sale, SaleItem
from backend.app.database import user_models     # User

from backend.app.routes import products
from backend.app.routes import sales
from backend.app.routes import reports
from backend.app.routes import auth

# 🔹 Crear tablas
Base.metadata.create_all(bind=engine)

# 🔹 Crear app
app = FastAPI(
    title="Billing SweetLove API",
    version="0.1.0"
)

# 🔥 CORS (OBLIGATORIO PARA FRONTEND)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Registrar routers (una sola vez)
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(sales.router)
app.include_router(reports.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
