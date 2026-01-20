// ================================
// AVAN TRID - SCRIPT COMPLETO
// ================================

// ----- DADOS DO JOGADOR -----
let saldo = 1000;
let nivel = 1;

// ----- SISTEMAS -----
let estoque = [];
let acoes = [];
let imoveis = 0;

// ----- PREÇOS -----
const precos = {
    alimento: 100,
    cosmetico: 200,
    ferramenta: 300
};

const precoAcoes = {
    avanCorp: 100,
    tridTech: 200
};

// ================================
// SALVAR E CARREGAR JOGO
// ================================
function salvarJogo() {
    const dados = {
        saldo,
        nivel,
        estoque,
        acoes,
        imoveis
    };
    localStorage.setItem("avanTridSave", JSON.stringify(dados));
}

function carregarJogo() {
    const save = localStorage.getItem("avanTridSave");

    if (save) {
        const dados = JSON.parse(save);
        saldo = dados.saldo ?? 1000;
        nivel = dados.nivel ?? 1;
        estoque = dados.estoque ?? [];
        acoes = dados.acoes ?? [];
        imoveis = dados.imoveis ?? 0;
    }

    atualizarTela();
}

// ================================
// ATUALIZAR INTERFACE
// ================================
function atualizarTela() {
    document.getElementById("saldo").innerText = saldo;
    document.getElementById("nivel").innerText = nivel;

    // Estoque
    const listaEstoque = document.getElementById("estoque");
    listaEstoque.innerHTML = "";
    estoque.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        listaEstoque.appendChild(li);
    });

    // Ações
    const listaAcoes = document.getElementById("acoes");
    listaAcoes.innerHTML = "";
    acoes.forEach(acao => {
        const li = document.createElement("li");
        li.innerText = acao;
        listaAcoes.appendChild(li);
    });

    // Imóveis
    document.getElementById("imoveis").innerText = imoveis;
}

// ================================
// COMPRA E VENDA DE PRODUTOS
// ================================
function comprarProduto() {
    const produto = document.getElementById("produto").value;
    const preco = precos[produto];

    if (saldo >= preco) {
        saldo -= preco;
        estoque.push(produto);
        salvarJogo();
        atualizarTela();
        alert("Produto comprado com sucesso!");
    } else {
        alert("Saldo insuficiente!");
    }
}

function venderProduto() {
    if (estoque.length === 0) {
        alert("Estoque vazio!");
        return;
    }

    const produto = estoque.shift();
    const lucro = Math.floor(precos[produto] * 1.3);
    saldo += lucro;

    if (saldo >= nivel * 2000) {
        nivel++;
        alert("🎉 Você subiu de nível!");
    }

    salvarJogo();
    atualizarTela();
}

// ================================
// SISTEMA DE AÇÕES
// ================================
function comprarAcao() {
    const acao = document.getElementById("acao").value;
    const preco = precoAcoes[acao];

    if (saldo >= preco) {
        saldo -= preco;
        acoes.push(acao);
        salvarJogo();
        atualizarTela();
        alert("Ação comprada!");
    } else {
        alert("Saldo insuficiente!");
    }
}

// ================================
// SISTEMA DE IMÓVEIS
// ================================
function comprarImovel() {
    const preco = 500;

    if (saldo >= preco) {
        saldo -= preco;
        imoveis++;
        salvarJogo();
        atualizarTela();
        alert("Imóvel adquirido!");
    } else {
        alert("Saldo insuficiente!");
    }
}

// ================================
// RENDA PASSIVA
// ================================
function gerarRendaPassiva() {
    const dividendos = acoes.length * 10; // por ação
    const aluguel = imoveis * 25;         // por imóvel

    saldo += dividendos + aluguel;
    salvarJogo();
    atualizarTela();
}

// ================================
// RESET DO JOGO (OPCIONAL)
// ================================
function resetarJogo() {
    if (confirm("Deseja apagar todo o progresso do Avan Trid?")) {
        localStorage.removeItem("avanTridSave");
        location.reload();
    }
}

// ================================
// INICIALIZAÇÃO
// ================================
carregarJogo();
setInterval(gerarRendaPassiva, 10000);
// COTAÇÕES
cotacao = {
  LIKRA: 3.44,
  TER: 1.22,
  FUG: 2.90,
  DEP: 8.44,
  POLO: 13.87,
  TIGER: 7.56
}

// CARTEIRA DO JOGADOR
jogador = {
  saldo: {
    LIKRA: 100,
    TER: 50,
    FUG: 30,
    DEP: 20,
    POLO: 10,
    TIGER: 15
  },
  emprestimos: [],
  titulos: []
}

// FUNDO CENTRAL (BANCO)
fundo = {
  LIKRA: 0,
  TER: 0,
  FUG: 0,
  DEP: 0,
  POLO: 0,
  TIGER: 0
}
valorConvertido = valor * cotacao
taxa = valorConvertido * 3%
liquido = valorConvertido - taxa
function converterMoeda(jogador, moeda, valor) {
  if (valor > jogador.saldo[moeda]) return false;

  let bruto = valor * cotacao[moeda];
  let taxa = bruto * 0.03;
  let liquido = bruto - taxa;

  jogador.saldo[moeda] -= valor;
  jogador.saldo.LIKRA += liquido;

  fundo[moeda] += valor * 0.03;
  return true;
}
