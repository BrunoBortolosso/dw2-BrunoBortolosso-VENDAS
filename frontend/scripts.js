// Tenta carregar produtos de produtos.json; se falhar, usa fallback
let produtos = [];
let descontoAtivo = false;

async function fetchProdutos() {
  try {
    const res = await fetch('produtos.json');
    if (!res.ok) throw new Error('fetch failed');
    produtos = await res.json();
  } catch (e) {
    // fallback offline
    produtos = [
      { id: 1, nome: "Caderno", descricao: "Caderno 200 folhas", preco: 15.90, estoque: 30 },
      { id: 2, nome: "Caneta Azul", descricao: "Caneta esferográfica azul", preco: 2.50, estoque: 100 },
      { id: 3, nome: "Mochila Escolar", descricao: "Mochila resistente para livros", preco: 120.00, estoque: 10 }
    ];
  }
}

function formatBRL(v){
  return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}

function criarCard(prod){
  const card = document.createElement('article');
  card.className = 'card';
  const imgHtml = prod.imagem ? `<img src="${escapeHtml(prod.imagem)}" alt="${escapeHtml(prod.nome)}">` : '<div style="font-size:0.9rem">Sem imagem</div>';
  const disabled = prod.estoque <= 0 ? 'disabled' : '';
  card.innerHTML = `
    <div class="thumb">${imgHtml}</div>
    <h3>${escapeHtml(prod.nome)}</h3>
    <p>${escapeHtml(prod.descricao)}</p>
    <div class="price">${formatBRL(prod.preco)}</div>
    <small style="color:var(--muted)">${prod.estoque} em estoque</small>
    <div class="actions">
      <button class="btn-add" data-id="${prod.id}" ${disabled}>Adicionar</button>
      <button class="btn-details" data-id="${prod.id}">Detalhes</button>
    </div>
  `;
  return card;
}

function carregarProdutosDOM(lista){
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';
  lista.forEach(p=> container.appendChild(criarCard(p)));
}

function escapeHtml(s){
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

// Carrinho: objeto id -> quantidade
function getCarrinho(){
  return JSON.parse(localStorage.getItem('carrinho_v2')||'{}');
}
function saveCarrinho(c){
  localStorage.setItem('carrinho_v2', JSON.stringify(c));
}

function adicionarCarrinho(id, qtd=1){
  const carr = getCarrinho();
  carr[id] = (carr[id]||0) + qtd;
  saveCarrinho(carr);
  atualizarCarrinho();
}

function removerDoCarrinho(id){
  const carr = getCarrinho();
  delete carr[id];
  saveCarrinho(carr);
  atualizarCarrinho();
  abrirCarrinho();
}

function alterarQuantidade(id, delta){
  const carr = getCarrinho();
  const atual = carr[id]||0;
  const novo = atual + delta;
  if (novo <= 0) delete carr[id]; else carr[id] = novo;
  saveCarrinho(carr);
  atualizarCarrinho();
  abrirCarrinho();
}

function atualizarCarrinho(){
  const carr = getCarrinho();
  const qtd = Object.values(carr).reduce((s,v)=>s+v,0);
  document.getElementById('quantidade').innerText = qtd;
}

function abrirCarrinho(){
  const carr = getCarrinho();
  const lista = document.getElementById('carrinho-lista');
  lista.innerHTML = '';
  let subtotal = 0;
  let totalItens = 0;

  for (const idStr of Object.keys(carr)){
    const id = Number(idStr);
    const qtd = carr[idStr];
    const prod = produtos.find(p=>p.id===id);
    if (!prod) continue;
  subtotal += prod.preco * qtd;
  totalItens += qtd;

    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div class="meta">
        <b>${escapeHtml(prod.nome)}</b>
        <small>${formatBRL(prod.preco)} cada</small>
      </div>
      <div class="qty-controls">
        <button aria-label="Diminuir" data-action="dec" data-id="${id}">-</button>
        <div>${qtd}</div>
        <button aria-label="Aumentar" data-action="inc" data-id="${id}">+</button>
        <button aria-label="Remover" data-action="rem" data-id="${id}" style="margin-left:8px">Remover</button>
      </div>
    `;
    lista.appendChild(li);
  }

  if (descontoAtivo) subtotal *= 0.9;

  document.getElementById('subtotal').innerText = `Subtotal: ${formatBRL(subtotal)}`;
  document.getElementById('total-itens').innerText = `${totalItens} item${totalItens!==1?'s':''}`;
  const modal = document.getElementById('carrinho-modal');
  modal.setAttribute('aria-hidden','false');
}

function fecharCarrinho(){
  document.getElementById('carrinho-modal').setAttribute('aria-hidden','true');
}

function aplicarCupom(){
  const cupom = document.getElementById('cupom').value.trim().toUpperCase();
  if (cupom === 'ALUNO10'){
    descontoAtivo = true; alert('✅ Cupom aplicado: 10% de desconto');
  } else {
    descontoAtivo = false; alert('❌ Cupom inválido');
  }
  abrirCarrinho();
}

function finalizarCompra(){
  localStorage.removeItem('carrinho_v2');
  descontoAtivo = false;
  atualizarCarrinho();
  fecharCarrinho();
  alert('🎉 Pedido finalizado com sucesso!');
}

// Delegation para botões de produtos e carrinho
document.addEventListener('click', function(e){
  const t = e.target;
  if (t.matches('.btn-add')){
    const id = Number(t.dataset.id);
    adicionarCarrinho(id,1);
  }
  if (t.matches('.btn-details')){
    // futura ação: abrir modal de detalhes
    const id = Number(t.dataset.id);
    const p = produtos.find(x=>x.id===id);
    if (p) alert(`${p.nome}\n\n${p.descricao}\n\n${formatBRL(p.preco)}`);
  }
  if (t.closest('.qty-controls') || t.dataset.action){
    const action = t.dataset.action;
    const id = Number(t.dataset.id);
    if (action === 'inc') alterarQuantidade(id,1);
    if (action === 'dec') alterarQuantidade(id,-1);
    if (action === 'rem') removerDoCarrinho(id);
  }
});

document.getElementById('btn-carrinho').addEventListener('click', abrirCarrinho);
document.getElementById('btn-aplicar-cupom').addEventListener('click', aplicarCupom);
document.getElementById('btn-finalizar').addEventListener('click', finalizarCompra);
document.getElementById('search').addEventListener('input', function(e){
  const q = e.target.value.trim().toLowerCase();
  const filtrado = produtos.filter(p=>p.nome.toLowerCase().includes(q) || p.descricao.toLowerCase().includes(q));
  carregarProdutosDOM(filtrado);
});

// Inicialização
(async function init(){
  await fetchProdutos();
  carregarProdutosDOM(produtos);
  atualizarCarrinho();
})();
