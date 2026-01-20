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
