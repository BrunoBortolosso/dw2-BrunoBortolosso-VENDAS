from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(60), nullable=False)
    descricao = Column(String(200))
    preco = Column(Float, nullable=False)
    estoque = Column(Integer, nullable=False)
    categoria = Column(String(50), nullable=False)
    sku = Column(String(50), unique=True, nullable=True)
