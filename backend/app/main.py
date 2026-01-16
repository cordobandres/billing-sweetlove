from fastapi import FastAPI
from backend.app.database.database import engine, Base
from backend.app.database import models
from backend.app.routes import products
from backend.app.database import models          # Product
from backend.app.database import sales_models    # Sale, SaleItem
from backend.app.routes import sales

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Billing SweetLove API")


app.include_router(products.router)
app.include_router(sales.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
