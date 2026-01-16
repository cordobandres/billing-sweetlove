from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database.database import get_db
from backend.app.database.models import Product
from backend.app.database.sales_models import Sale, SaleItem
from backend.app.models.sale import (
    SaleCreate,
    SaleResponse,
    SaleItemResponse
)
from backend.app.security.dependencies import get_current_user

router = APIRouter(
    prefix="/sales",
    tags=["Sales"]
)


@router.post("/", response_model=SaleResponse)
def create_sale(
    sale: SaleCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    if not sale.items:
        raise HTTPException(status_code=400, detail="Sale must contain items")

    total = 0.0

    sale_db = Sale(total=0.0)
    db.add(sale_db)
    db.flush()  # 🔥 obtenemos sale_db.id SIN commit

    for item in sale.items:
        product = (
            db.query(Product)
            .filter(Product.id == item.product_id, Product.is_active == True)
            .with_for_update()  # 🔐 bloquea stock
            .first()
        )

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for product {product.name}"
            )

        product.stock -= item.quantity

        subtotal = product.price * item.quantity
        total += subtotal

        sale_item = SaleItem(
            sale_id=sale_db.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price,
            subtotal=subtotal
        )

        db.add(sale_item)

    sale_db.total = total
    db.commit()
    db.refresh(sale_db)

    return SaleResponse(
        id=sale_db.id,
        date=sale_db.date,
        total=sale_db.total,
        items=[
            SaleItemResponse(
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=item.subtotal
            )
            for item in sale_db.items
        ]
    )



@router.get("/", response_model=list[SaleResponse])
def get_sales(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    sales = db.query(Sale).filter(Sale.is_cancelled == False).all()

    return [
        SaleResponse(
            id=sale.id,
            date=sale.date,
            total=sale.total,
            items=[
                SaleItemResponse(
                    product_id=item.product_id,
                    quantity=item.quantity,
                    unit_price=item.unit_price,
                    subtotal=item.subtotal
                )
                for item in sale.items
            ]
        )
        for sale in sales
    ]


@router.patch("/{sale_id}/cancel")
def cancel_sale(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    sale = (
        db.query(Sale)
        .filter(Sale.id == sale_id, Sale.is_cancelled == False)
        .first()
    )

    if not sale:
        raise HTTPException(
            status_code=404,
            detail="Sale not found or already cancelled"
        )

    for item in sale.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        product.stock += item.quantity

    sale.is_cancelled = True
    db.commit()

    return {"message": "Sale cancelled successfully"}


@router.get("/{sale_id}", response_model=SaleResponse)
def get_sale_detail(
    sale_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    sale = (
        db.query(Sale)
        .filter(Sale.id == sale_id)
        .first()
    )

    if not sale:
        raise HTTPException(status_code=404, detail="Sale not found")

    return SaleResponse(
        id=sale.id,
        date=sale.date,
        total=sale.total,
        items=[
            SaleItemResponse(
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=item.subtotal
            )
            for item in sale.items
        ]
    )
