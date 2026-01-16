from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.app.database.database import get_db
from backend.app.database.sales_models import SaleItem
from backend.app.database.models import Product



router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


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

    return [
        {
            "product": name,
            "total_sold": total
        }
        for name, total in results
    ]

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

    return [
        {
            "category": category,
            "total_sold": total
        }
        for category, total in results
    ]
