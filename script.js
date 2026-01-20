// ===============================
// SISTEMA Likra 
// ===============================
const STORAGE_KEY = "LIKRA_GAME";

// ===============================
// ESTADO PADRÃO
// ===============================
let estadoPadrao = {
    saldoLikra: 10000, // moeda base LiKra 
    precos: {
        K$: 3,44
        YBRA: 7,36
    },
    carteira: {
    K$: 0,
       YBRA: 0
    }
};

// ===============================
// CARREGAR / SALVAR
// ===============================
function carregarEstado() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : JSON.parse(JSON.stringify(estadoPadrao));
}

function salvarEstado() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        saldoORS,
        precos,
        carteira
    }));
}

// ===============================
// ESTADO ATUAL
// ===============================
let estado = carregarEstado();
let saldoK$ = estado.saldoK$;
let precos = estado.precos;
let carteira = estado.carteira;

// ===============================
// UI
// ===============================
function atualizarSaldo() {
    const el = document.getElementById("saldo");
    if (el) el.innerText = saldoK$.toFixed(2) + " K$";
}

function atualizarPrecos() {
    for (let ativo in precos) {
        const el = document.getElementById("preco-" + ativo);
        if (el) el.innerText = precos[ativo].toFixed(2) + " K$";
    }
}

function atualizarCarteira() {
    const el = document.getElementById("carteira");
    if (!el) return;

    el.innerHTML = `
        <div>BTC: <strong>${carteira.BTC}</strong></div>
        <div>ETH: <strong>${carteira.ETH}</strong></div>
    `;
}

// ===============================
// MERCADO (VARIAÇÕES)
// ===============================
function variarMercado() {
    for (let ativo in precos) {
        let variacao = (Math.random() * 0.05) - 0.02;
        precos[ativo] += precos[ativo] * variacao;
        precos[ativo] = Math.max(1, precos[ativo]);
    }
    salvarEstado();
    atualizarPrecos();
}

// ===============================
// NEGOCIAÇÃO
// ===============================
function comprar(ativo) {
    let preco = precos[ativo];
    if (saldoK$ >= preco) {
        saldok$ -= preco;
        carteira[ativo]++;
        salvarEstado();
        atualizarSaldo();
        atualizarCarteira();
    } else {
        alert("Saldo K$ insuficiente");
    }
}

function vender(ativo) {
    if (carteira[ativo] > 0) {
        saldoK$ += precos[ativo];
        carteira[ativo]--;
        salvarEstado();
        atualizarSaldo();
        atualizarCarteira();
    } else {
        alert("Você não possui esse ativo");
    }
}

// ===============================
// RESULTADO (LUCRO / PREJUÍZO)
// ===============================
function calcularResultado() {
    let investido = 0;
    let atual = 0;

    for (let ativo in carteira) {
        investido += carteira[ativo] * estadoPadrao.precos[ativo];
        atual += carteira[ativo] * precos[ativo];
    }

    const el = document.getElementById("resultado");
    if (!el) return;

    let diff = atual - investido;
    let cor = diff >= 0 ? "#16a34a" : "#dc2626";
    let sinal = diff >= 0 ? "+" : "";

    el.innerHTML = `
        <div>Investido: ${investido.toFixed(2)} K$</div>
        <div>Valor atual: ${atual.toFixed(2)} K$</div>
        <div style="color:${cor}; font-weight:bold">
            Resultado: ${sinal}${diff.toFixed(2)} K$
        </div>
    `;
}

// ===============================
// INICIALIZAÇÃO
// ===============================
atualizarSaldo();
atualizarPrecos();
atualizarCarteira();
calcularResultado();
setInterval(variarMercado, 10000);
setInterval(calcularResultado, 1000);
