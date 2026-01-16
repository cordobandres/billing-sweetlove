from enum import Enum
from pydantic import BaseModel
from typing import Optional

class ProductCategory(str, Enum):
    PAJAMA = "PAJAMA"
    BASIC_LINGERIE = "BASIC_LINGERIE"
    LIGUER = "LIGUER"
    CROP_TOP = "CROP_TOP"
    BODY = "BODY"

class ProductSize(str, Enum):
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"

class ProductCreate(BaseModel):
    name: str
    category: ProductCategory
    color: str
    size: ProductSize
    stock: int
    price: float

class ProductResponse(BaseModel):
    id: int
    name: str
    category: ProductCategory
    color: str
    size: ProductSize
    stock: int
    price: float
