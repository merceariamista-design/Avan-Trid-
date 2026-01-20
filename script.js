let saldo = 1000;
let nivel = 1;
let estoque = [];

const precos = {
    alimento: 100,
    cosmetico: 200,
    ferramenta: 300
};



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
    function atualizarTela() {
    document.getElementById("saldo").innerText = saldo;
    document.getElementById("nivel").innerText = nivel;

    const listaEstoque = document.getElementById("estoque");
    listaEstoque.innerHTML = "";
    estoque.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item;
        listaEstoque.appendChild(li);
    });

    const listaAcoes = document.getElementById("acoes");
    listaAcoes.innerHTML = "";
    acoes.forEach(a => {
        const li = document.createElement("li");
        li.innerText = a;
        listaAcoes.appendChild(li);
    });

    document.getElementById("imoveis").innerText = imoveis;
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
let acoes = [];
let imoveis = 0;

const precoAcoes = {
    avanCorp: 100,
    tridTech: 200
};
function comprarAcao() {
    const acao = document.getElementById("acao").value;
    const preco = precoAcoes[acao];

    if (saldo >= preco) {
        saldo -= preco;
        acoes.push(acao);
        atualizarTela();
        alert("Ação comprada!");
    } else {
        alert("Saldo insuficiente!");
    }
}
function comprarImovel() {
    const preco = 500;

    if (saldo >= preco) {
        saldo -= preco;
        imoveis++;
        atualizarTela();
        alert("Imóvel adquirido!");
    } else {
        alert("Saldo insuficiente!");
    }
}
function gerarRendaPassiva() {
    let dividendos = acoes.length * 10; // 10 TRD por ação
    let aluguel = imoveis * 25; // 25 TRD por imóvel

    saldo += dividendos + aluguel;
    atualizarTela();
}
setInterval(gerarRendaPassiva, 10000);
