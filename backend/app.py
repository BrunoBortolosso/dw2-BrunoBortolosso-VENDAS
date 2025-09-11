from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI(title="Loja Escolar")

# 🚀 Permitir que o frontend (index.html) acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # pode restringir depois para ["http://127.0.0.1:5500"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

# Dependência de sessão
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 Rota de teste
@app.get("/health")
def health():
    return {"status": "ok"}

# 🔹 Listar produtos
@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_db)):
    return db.query(models.Produto).all()
