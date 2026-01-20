let saldo = 1000;
let nivel = 1;
let estoque = [];

const precos = {
    alimento: 100,
    cosmetico: 200,
    ferramenta: 300
};

function atualizarTela() {
    document.getElementById("saldo").innerText = saldo;
    document.getElementById("nivel").innerText = nivel;

    const lista = document.getElementById("estoque");
    lista.innerHTML = "";

    estoque.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerText = item;
        lista.appendChild(li);
    });
}

function comprarProduto() {
    const produto = document.getElementById("produto").value;
    const preco = precos[produto];

    if (saldo >= preco) {
        saldo -= preco;
        estoque.push(produto);
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

    atualizarTela();
}
