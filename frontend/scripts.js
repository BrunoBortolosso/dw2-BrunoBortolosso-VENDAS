// Produtos fixos (funciona offline com file://)
const produtos = [
  { id: 1, nome: "Caderno", descricao: "Caderno 200 folhas", preco: 15.90, estoque: 30 },
  { id: 2, nome: "Caneta Azul", descricao: "Caneta esferográfica azul", preco: 2.50, estoque: 100 },
  { id: 3, nome: "Mochila Escolar", descricao: "Mochila resistente para livros", preco: 120.00, estoque: 10 }
];

// Renderizar produtos na tela
function carregarProdutos() {
  const container = document.getElementById("produtos-container");
  container.innerHTML = "";

  produtos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${prod.nome}</h3>
      <p>${prod.descricao}</p>
      <p><b>R$ ${prod.preco.toFixed(2)}</b></p>
      <button onclick="adicionarCarrinho(${prod.id})">Adicionar</button>
    `;
    container.appendChild(card);
  });
}

// Função do carrinho
function adicionarCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  document.getElementById("quantidade").innerText = carrinho.length;
}

// Atualizar contador ao carregar
function atualizarCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  document.getElementById("quantidade").innerText = carrinho.length;
}

carregarProdutos();
atualizarCarrinho();
