from sqlalchemy import Column, Integer, String, Float, Boolean
from backend.app.database.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    color = Column(String, nullable=False)
    size = Column(String, nullable=False)
    stock = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
