# Conversas com IA - Desenvolvimento do Sistema de Vendas

## Conversa em 19/08/2025

### Usuário:
ola bom dia chat, hoje sua missao é estudar esse arquivo e criar um mini sistemas que neste trabalho de escola fiquei encarregado de VENDAS, ou seja o site tem que ser de vendas ok?

### IA:
Bom dia, Bruno! 🌞
Li o arquivo do Projeto Bimestral 2TIB e já entendi: seu grupo ficou encarregado de fazer o mini-sistema de VENDAS.

Ou seja, você precisa desenvolver um site de vendas de produtos (tipo uma lojinha online) com front-end em HTML, CSS e JS e back-end em Python (FastAPI ou Flask) + SQLite.

✅ O que o seu sistema de VENDAS precisa ter (resumido do PDF):

**Identidade visual**
- Azul claro (#0EA5E9)
- Vermelho (#EF4444)
- Verde (#22C55E)
- Fundo branco
- Fonte: Poppins ou Inter

**Front-end (HTML + CSS + JS)**
- Header com logo "Loja Escolar" e carrinho (mostrando quantidade de itens)
- Catálogo de produtos (grid com imagem, nome, preço, estoque)
- Carrinho (modal ou drawer lateral) mostrando itens, subtotal e cupom
- Página de admin (cadastro de produto)
- Validações no formulário (nome, preço, estoque etc)
- Carrinho salvo no localStorage
- Cupom "ALUNO10" (10% de desconto)
- Ordenação de produtos (preço/nome)
- Acessibilidade: botões com aria-label, navegação por teclado

**Back-end (FastAPI/Flask + SQLite)**
- Banco: Produto (id, nome, descricao, preco, estoque, categoria, sku)
- Endpoints:
  - GET /produtos (listar/buscar/ordenar)
  - POST /produtos (criar)
  - PUT /produtos/{id} (editar)
  - DELETE /produtos/{id} (apagar)
  - POST /carrinho/confirmar (validar estoque, aplicar cupom, registrar pedido)

**Extras obrigatórios (escolher 3)**
Por exemplo:
- Validações customizadas (ex: preço > 0, estoque ≥ 0)
- Ordenação persistida (salva no localStorage)
- Seed com 20 produtos fictícios

### Usuário:
me mande um esqueleto e depois vamos aperfeiçoando para que assim seja um site top

### IA:
[Forneceu a estrutura completa do projeto com todos os arquivos necessários, incluindo:]

**Estrutura de Pastas:**
```
projeto-vendas/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── database.py
│   ├── seed.py
│   ├── requirements.txt
│   └── app.db
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
│
├── README.md
└── REPORT.md
```

[Incluiu o código completo para todos os arquivos do backend e frontend, com implementações básicas funcionais]

## Status Atual
- Estrutura básica criada
- Backend com FastAPI configurado
- Frontend com design inicial implementado
- Sistema de carrinho básico funcionando
- Próximo passo: Instalar dependências e testar o sistema
