// ===============================
// CHAVES DE SALVAMENTO
// ===============================
const STORAGE_KEY = "LIKRA_JOGO";

// ===============================
// ESTADO PADRÃO DO JOGO
// ===============================
let estadoPadrao = {
    saldo: 10000,
    moedas: {
        Bitcoin: 500,
        Ethereum: 300,
        Orsilan: 50
    },
    carteira: {
        Bitcoin: 0,
        Ethereum: 0,
        Orsilan: 0
    }
};

// ===============================
// CARREGAR / SALVAR
// ===============================
function carregarEstado() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
        return JSON.parse(salvo);
    }
    return JSON.parse(JSON.stringify(estadoPadrao));
}

function salvarEstado() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        saldo,
        moedas,
        carteira
    }));
}

// ===============================
// ESTADO ATUAL
// ===============================
let estado = carregarEstado();
let saldo = estado.saldo;
let moedas = estado.moedas;
let carteira = estado.carteira;

// ===============================
// UI
// ===============================
function atualizarSaldo() {
    const el = document.getElementById("saldo");
    if (el) el.innerText = saldo.toFixed(2);
}

function atualizarPrecos() {
    for (let moeda in moedas) {
        const el = document.getElementById("preco-" + moeda);
        if (el) el.innerText = moedas[moeda].toFixed(2);
    }
}

function atualizarCarteira() {
    const el = document.getElementById("carteira");
    if (!el) return;

    el.innerHTML = `
        <div>Bitcoin: <strong>${carteira.Bitcoin}</strong></div>
        <div>Ethereum: <strong>${carteira.Ethereum}</strong></div>
        <div>Orsilan: <strong>${carteira.Orsilan}</strong></div>
    `;
}

// ===============================
// MERCADO
// ===============================
function variarMercado() {
    for (let moeda in moedas) {
        let variacao = (Math.random() * 0.10) - 0.05; // -5% a +5%
        moedas[moeda] += moedas[moeda] * variacao;
        moedas[moeda] = Math.max(1, moedas[moeda]);
    }
    salvarEstado();
    atualizarPrecos();
}

function comprar(moeda) {
    let preco = moedas[moeda];
    if (saldo >= preco) {
        saldo -= preco;
        carteira[moeda]++;
        salvarEstado();
        atualizarSaldo();
        atualizarCarteira();
    } else {
        alert("Saldo insuficiente");
    }
}

function vender(moeda) {
    if (carteira[moeda] > 0) {
        saldo += moedas[moeda];
        carteira[moeda]--;
        salvarEstado();
        atualizarSaldo();
        atualizarCarteira();
    } else {
        alert("Você não possui essa moeda");
    }
}

// ===============================
// NAVEGAÇÃO
// ===============================
function irBanco() {
    window.location.href = "banco.html";
}

// ===============================
// INICIALIZAÇÃO
// ===============================
atualizarSaldo();
atualizarPrecos();
atualizarCarteira();
setInterval(variarMercado, 10000);
