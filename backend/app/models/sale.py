from pydantic import BaseModel
from typing import List
from datetime import datetime


class SaleItemCreate(BaseModel):
    product_id: int
    quantity: int


class SaleCreate(BaseModel):
    items: List[SaleItemCreate]


class SaleItemResponse(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    subtotal: float


class SaleResponse(BaseModel):
    id: int
    date: datetime
    total: float
    items: List[SaleItemResponse]
