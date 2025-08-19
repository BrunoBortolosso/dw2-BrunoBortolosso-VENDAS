from . import models, database

def seed():
    db = database.SessionLocal()

    produtos = [
        models.Produto(nome="Caderno", descricao="Caderno 200 folhas", preco=15.90, estoque=30, categoria="Papelaria"),
        models.Produto(nome="Caneta Azul", descricao="Caneta esferográfica", preco=2.50, estoque=100, categoria="Papelaria"),
        models.Produto(nome="Mochila Escolar", descricao="Mochila resistente", preco=120.00, estoque=10, categoria="Acessórios"),
    ]

    db.add_all(produtos)
    db.commit()
    db.close()
    print("Seed inserido com sucesso!")

if __name__ == "__main__":
    models.Base.metadata.create_all(bind=database.engine)
    seed()
