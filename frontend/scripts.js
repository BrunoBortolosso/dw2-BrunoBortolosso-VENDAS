const API_URL = "http://127.0.0.1:8000";  // Endereço da API

// 🔹 Carregar produtos do backend
async function carregarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/produtos`);
    if (!resposta.ok) throw new Error("Erro ao carregar produtos");
    
    const produtos = await resposta.json();
    const container = document.getElementById("produtos-container");
    container.innerHTML = "";

    produtos.forEach(prod => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${prod.nome}</h3>
        <p>${prod.descricao || ""}</p>
        <p><b>R$ ${prod.preco.toFixed(2)}</b></p>
        <button onclick="adicionarCarrinho(${prod.id})">Adicionar</button>
      `;
      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

// 🔹 Função para adicionar produto no carrinho
function adicionarCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  document.getElementById("quantidade").innerText = carrinho.length;
}

carregarProdutos();
