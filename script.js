// ===== CONFIGURAÇÕES INICIAIS =====
const SALDO_INICIAL = 1000; // K$ 1.000 iniciais

// ===== ENTRADA DO JOGO =====
function entrarJogo() {
  const nome = document.getElementById("nomeJogador").value.trim();

  if (!nome) {
    alert("Digite seu nome");
    return;
  }

  const jogador = {
    nome: nome,
    likra: SALDO_INICIAL
  };

  localStorage.setItem("jogador", JSON.stringify(jogador));
  window.location.href = "game.html";
}

// ===== CARREGAR JOGADOR =====
function carregarJogador() {
  const dados = localStorage.getItem("jogador");
  if (!dados) return;

  const jogador = JSON.parse(dados);

  // Nome
  const nomeEl = document.getElementById("nomeJogadorTela");
  if (nomeEl) nomeEl.innerText = jogador.nome;

  // Saldo
  atualizarSaldo(jogador.likra);
}

// ===== ATUALIZAR SALDO NA TELA =====
function atualizarSaldo(valor) {
  const saldoEl = document.getElementById("saldoLikra");
  if (saldoEl) {
    saldoEl.innerText = "K$ " + valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2
    });
  }
}
// ===== MOEDAS DO JOGO =====
const moedas = {
  LIKRA: { simbolo: "K$", valor: 1 },
  TER: { simbolo: "€", valor: 1.22 },
  FUG: { simbolo: "$", valor: 2.90 },
  DEP: { simbolo: "£", valor: 8.44 },
  POLO: { simbolo: "$", valor: 13.87 },
  TIGER: { simbolo: "¢", valor: 7.56 }
};

const TAXA_BANCO = 0.03; // 3%

// ===== FUNDO DO BANCO (SECRETO) =====
function carregarFundo() {
  let fundo = localStorage.getItem("fundoBanco");
  if (!fundo) {
    fundo = {
      LIKRA: 0,
      TER: 0,
      FUG: 0,
      DEP: 0,
      POLO: 0,
      TIGER: 0
    };
    localStorage.setItem("fundoBanco", JSON.stringify(fundo));
  }
  return JSON.parse(localStorage.getItem("fundoBanco"));
}

function salvarFundo(fundo) {
  localStorage.setItem("fundoBanco", JSON.stringify(fundo));
}

// ===== TRANSAÇÃO COM TAXA =====
function transacao(valor, moeda = "LIKRA") {
  let jogador = JSON.parse(localStorage.getItem("jogador"));
  let fundo = carregarFundo();

  if (!jogador) return;

  const taxa = valor * TAXA_BANCO;
  const valorLiquido = valor - taxa;

  // Atualiza saldo do jogador
  jogador.likra += converterParaLikra(valorLiquido, moeda);

  // Guarda taxa no fundo
  fundo[moeda] += taxa;

  // Salva tudo
  localStorage.setItem("jogador", JSON.stringify(jogador));
  salvarFundo(fundo);

  atualizarSaldo(jogador.likra);
}

// ===== CONVERSÃO PARA LIKRA =====
function converterParaLikra(valor, moeda) {
  return valor * moedas[moeda].valor;
}
// ===== VISUAL ADMIN DO FUNDO =====
function carregarFundoAdmin() {
  const fundo = carregarFundo();
  const div = document.getElementById("fundoBanco");

  if (!div) return;

  div.innerHTML = "";

  for (let moeda in fundo) {
    div.innerHTML += `
      <div class="card">
        <strong>${moeda}</strong><br>
        Saldo: ${fundo[moeda].toFixed(2)}
      </div>
    `;
  }
}
function irPara(pagina) {
  window.location.href = pagina;
}

// ===== CONVERTER FUNDO PARA LIKRA =====
function converterTudoParaLikra() {
  let fundo = carregarFundo();
  let totalLikra = 0;

  for (let moeda in fundo) {
    totalLikra += converterParaLikra(fundo[moeda], moeda);
    fundo[moeda] = 0;
  }

  // Guarda tudo em LIKRA
  fundo.LIKRA += totalLikra;

  salvarFundo(fundo);
  carregarFundoAdmin();

  alert("Fundo convertido para LIKRA com sucesso!");
}

