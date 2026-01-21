from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.app.database.database import get_db
from backend.app.database.sales_models import Sale, SaleItem
from backend.app.database.models import Product
from backend.app.security.dependencies import get_current_user

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

@router.get("/top-products")
def top_products(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    results = (
        db.query(
            Product.name,
            func.sum(SaleItem.quantity).label("total_sold")
        )
        .join(SaleItem, Product.id == SaleItem.product_id)
        .group_by(Product.name)
        .order_by(func.sum(SaleItem.quantity).desc())
        .all()
    )

    return [{"product": name, "total": total} for name, total in results]


@router.get("/by-category")
def sales_by_category(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    results = (
        db.query(
            Product.category,
            func.sum(SaleItem.quantity).label("total")
        )
        .join(SaleItem, Product.id == SaleItem.product_id)
        .group_by(Product.category)
        .all()
    )

    return [{"category": c, "total": t} for c, t in results]


@router.get("/by-month")
def sales_by_month(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    results = (
        db.query(
            func.strftime("%Y-%m", Sale.date).label("month"),
            func.sum(Sale.total).label("total")
        )
        .filter(Sale.is_cancelled == False)
        .group_by("month")
        .order_by("month")
        .all()
    )

    return [{"month": m, "total": t} for m, t in results]
