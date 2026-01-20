let saldo = 10000;

function atualizarSaldo() {
    if (document.getElementById("saldo")) {
        document.getElementById("saldo").innerText = saldo.toFixed(2);
    }
    if (document.getElementById("saldoBanco")) {
        document.getElementById("saldoBanco").innerText = saldo.toFixed(2);
    }
}

function comprar(nome, valor) {
    if (saldo >= valor) {
        saldo -= valor;
        alert(`Você comprou ${nome} por R$ ${valor}`);
        atualizarSaldo();
    } else {
        alert("Saldo insuficiente!");
    }
}

function emprestimo(valor) {
    saldo += valor;
    alert(`Empréstimo de R$ ${valor} concedido`);
    atualizarSaldo();
}

function irBanco() {
    window.location.href = "banco.html";
}

function voltarMercado() {
    window.location.href = "mercado.html";
}

atualizarSaldo();
