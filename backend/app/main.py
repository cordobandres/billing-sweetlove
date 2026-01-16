from fastapi import FastAPI

from backend.app.database.database import engine, Base
from backend.app.database import models          # Product
from backend.app.database import sales_models    # Sale, SaleItem
from backend.app.database import user_models     # User
#
from backend.app.routes import products
from backend.app.routes import sales
from backend.app.routes import reports
from backend.app.routes import auth


# 🔹 Crear tablas
Base.metadata.create_all(bind=engine)

# 🔹 Crear app
app = FastAPI(title="Billing SweetLove API")

# 🔹 Registrar routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(sales.router)
app.include_router(reports.router)
app.include_router(auth.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
