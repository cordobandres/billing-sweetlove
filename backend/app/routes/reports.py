from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from backend.app.database.database import get_db
from backend.app.database.sales_models import SaleItem, Sale
from backend.app.database.models import Product

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

# 1️⃣ Top productos vendidos
@router.get("/top-products")
def top_products(db: Session = Depends(get_db)):
    results = (
        db.query(
            Product.name,
            func.sum(SaleItem.quantity).label("total_sold")
        )
        .join(Product, Product.id == SaleItem.product_id)
        .group_by(Product.name)
        .order_by(func.sum(SaleItem.quantity).desc())
        .all()
    )

    return [{"product": name, "total_sold": total} for name, total in results]


# 2️⃣ Ventas por categoría
@router.get("/by-category")
def sales_by_category(db: Session = Depends(get_db)):
    results = (
        db.query(
            Product.category,
            func.sum(SaleItem.quantity).label("total_sold")
        )
        .join(Product, Product.id == SaleItem.product_id)
        .group_by(Product.category)
        .order_by(func.sum(SaleItem.quantity).desc())
        .all()
    )

    return [{"category": category, "total_sold": total} for category, total in results]


# 3️⃣ Ventas por MES
@router.get("/by-month")
def sales_by_month(db: Session = Depends(get_db)):
    results = (
        db.query(
            func.strftime("%Y-%m", Sale.date).label("month"),
            func.sum(Sale.total).label("total_sales")
        )
        .filter(Sale.is_cancelled == False)
        .group_by("month")
        .order_by("month")
        .all()
    )

    return [{"month": month, "total_sales": total} for month, total in results]


# 4️⃣ Ventas por TALLA
@router.get("/by-size")
def sales_by_size(db: Session = Depends(get_db)):
    results = (
        db.query(
            Product.size,
            func.sum(SaleItem.quantity).label("total_sold")
        )
        .join(Product, Product.id == SaleItem.product_id)
        .group_by(Product.size)
        .order_by(func.sum(SaleItem.quantity).desc())
        .all()
    )

    return [{"size": size, "total_sold": total} for size, total in results]


# 5️⃣ Ventas por COLOR
@router.get("/by-color")
def sales_by_color(db: Session = Depends(get_db)):
    results = (
        db.query(
            Product.color,
            func.sum(SaleItem.quantity).label("total_sold")
        )
        .join(Product, Product.id == SaleItem.product_id)
        .group_by(Product.color)
        .order_by(func.sum(SaleItem.quantity).desc())
        .all()
    )

    return [{"color": color, "total_sold": total} for color, total in results]
