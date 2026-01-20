// ===== ENTRADA DO JOGO =====
function entrarJogo() {
  const nome = document.getElementById("nomeJogador").value.trim();

  if (!nome) {
    alert("Digite seu nome");
    return;
  }

  localStorage.setItem("jogadorNome", nome);
  window.location.href = "game.html";
}

// ===== CARREGAR JOGADOR NO JOGO =====
function carregarJogador() {
  const nome = localStorage.getItem("jogadorNome") || "Jogador";

  const el = document.getElementById("nomeJogadorTela");
  if (el) {
    el.innerText = nome;
  }
}
