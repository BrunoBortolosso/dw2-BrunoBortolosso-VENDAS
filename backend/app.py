from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI(title="Loja Escolar")

models.Base.metadata.create_all(bind=database.engine)

# Dependência de sessão
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota de teste
@app.get("/health")
def health():
    return {"status": "ok"}

# Listar produtos
@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_db)):
    return db.query(models.Produto).all()
