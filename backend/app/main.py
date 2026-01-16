from fastapi import FastAPI
from backend.app.database.database import engine, Base
from backend.app.database import models
from backend.app.routes import products


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Billing SweetLove API")

app.include_router(products.router)

@app.get("/health")
def health_check():
    return {"status": "ok"}
