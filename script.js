// ===============================
// MERCADO COM VARIAÇÕES
// ===============================

// Saldo do jogador
let saldo = 10000;

// Moedas do mercado
let moedas = {
    Bitcoin: 500,
    Ethereum: 300,
    Orsilan: 50
};

// Atualiza saldo na tela
function atualizarSaldo() {
    if (document.getElementById("saldo")) {
        document.getElementById("saldo").innerText = saldo.toFixed(2);
    }
    if (document.getElementById("saldoBanco")) {
        document.getElementById("saldoBanco").innerText = saldo.toFixed(2);
    }
}

// Atualiza preços na tela
function atualizarPrecos() {
    for (let moeda in moedas) {
        let el = document.getElementById("preco-" + moeda);
        if (el) {
            el.innerText = moedas[moeda].toFixed(2);
        }
    }
}

// Variação automática de preços
function variarMercado() {
    for (let moeda in moedas) {
        let variacao = (Math.random() * 0.10) - 0.05; // -5% a +5%
        moedas[moeda] += moedas[moeda] * variacao;
        moedas[moeda] = Math.max(1, moedas[moeda]); // nunca zero
    }
    atualizarPrecos();
}

// Comprar moeda
function comprar(moeda) {
    let preco = moedas[moeda];
    if (saldo >= preco) {
        saldo -= preco;
        alert(`Comprou ${moeda} por R$ ${preco.toFixed(2)}`);
        atualizarSaldo();
    } else {
        alert("Saldo insuficiente!");
    }
}

// Vender moeda
function vender(moeda) {
    let preco = moedas[moeda];
    saldo += preco;
    alert(`Vendeu ${moeda} por R$ ${preco.toFixed(2)}`);
    atualizarSaldo();
}

// Navegação
function irBanco() {
    window.location.href = "banco.html";
}

function voltarMercado() {
    window.location.href = "mercado.html";
}

// Inicialização
atualizarSaldo();
atualizarPrecos();
setInterval(variarMercado, 10000);
