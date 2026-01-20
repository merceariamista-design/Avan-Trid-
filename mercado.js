// ===============================
// CONFIGURAÇÕES GERAIS
// ===============================
const TAXA = 0.03; // 3%
let moedaBase = "LIKRA";

// Valores iniciais das moedas
let mercado = {
    LIKRA: 3.44,
    TER: 1.22,
    FUG: 2.90,
    DEP: 8.44,
    POLO: 13.87,
    TIGER: 7.56
};

// Carteira do jogador (exemplo)
let carteira = {
    LIKRA: 1000,
    TER: 0,
    FUG: 0,
    DEP: 0,
    POLO: 0,
    TIGER: 0
};

// Fundo central (admin – invisível depois)
let fundo = {
    LIKRA: 0,
    TER: 0,
    FUG: 0,
    DEP: 0,
    POLO: 0,
    TIGER: 0
};

// ===============================
// FUNÇÕES PRINCIPAIS
// ===============================

function comprar(moeda, quantidade = 1) {
    let preco = mercado[moeda] * quantidade;
    let taxa = preco * TAXA;
    let total = preco + taxa;

    if (carteira.LIKRA >= total) {
        carteira.LIKRA -= total;
        carteira[moeda] += quantidade;

        fundo.LIKRA += taxa;

        alert(`Comprou ${quantidade} ${moeda}\nTaxa: K$ ${taxa.toFixed(2)}`);
        console.log("Carteira:", carteira);
        console.log("Fundo:", fundo);
    } else {
        alert("Saldo insuficiente em Likra!");
    }
}

function vender(moeda, quantidade = 1) {
    if (carteira[moeda] >= quantidade) {
        let preco = mercado[moeda] * quantidade;
        let taxa = preco * TAXA;
        let liquido = preco - taxa;

        carteira[moeda] -= quantidade;
        carteira.LIKRA += liquido;

        fundo.LIKRA += taxa;

        alert(`Vendeu ${quantidade} ${moeda}\nTaxa: K$ ${taxa.toFixed(2)}`);
        console.log("Carteira:", carteira);
        console.log("Fundo:", fundo);
    } else {
        alert("Você não tem essa moeda suficiente!");
    }
}

// ===============================
// VARIAÇÃO DE MERCADO (SIMULADA)
// ===============================
function variarMercado() {
    for (let moeda in mercado) {
        let variacao = (Math.random() * 0.1 - 0.05); // -5% a +5%
        mercado[moeda] += mercado[moeda] * variacao;
        mercado[moeda] = Number(mercado[moeda].toFixed(2));
    }
    console.log("Mercado atualizado:", mercado);
}

// Atualiza mercado a cada 10 segundos
setInterval(variarMercado, 10000);

// ===============================
// CONEXÃO COM BOTÕES
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".buy").forEach(btn => {
        btn.addEventListener("click", () => {
            let moeda = btn.closest(".coin-card")
                           .querySelector(".coin-name")
                           .innerText.split(" ")[0];
            comprar(moeda);
        });
    });

    document.querySelectorAll(".sell").forEach(btn => {
        btn.addEventListener("click", () => {
            let moeda = btn.closest(".coin-card")
                           .querySelector(".coin-name")
                           .innerText.split(" ")[0];
            vender(moeda);
        });
    });
});
// ===============================
// SISTEMA DE TÍTULOS
// ===============================
let titulos = [];

function comprarTitulo(valor, juros = 0.1, tempo = 30) {
    if (carteira.LIKRA >= valor) {
        carteira.LIKRA -= valor;
        fundo.LIKRA += valor;

        let titulo = {
            valor,
            juros,
            tempo,
            criadoEm: Date.now(),
            resgatado: false
        };

        titulos.push(titulo);
        alert(`Título comprado!\nValor: K$ ${valor}\nJuros: ${juros * 100}%`);
    } else {
        alert("Likra insuficiente para comprar título.");
    }
}

function resgatarTitulos() {
    let agora = Date.now();
    titulos.forEach(t => {
        if (!t.resgatado && agora - t.criadoEm >= t.tempo * 1000) {
            let lucro = t.valor * t.juros;
            carteira.LIKRA += t.valor + lucro;
            fundo.LIKRA -= lucro;
            t.resgatado = true;
        }
    });
}

// Checa títulos automaticamente
setInterval(resgatarTitulos, 5000);
// ===============================
// SISTEMA DE EMPRÉSTIMOS
// ===============================
let emprestimos = [];

function pedirEmprestimo(valor, juros = 0.15, parcelas = 5) {
    if (fundo.LIKRA >= valor) {
        fundo.LIKRA -= valor;
        carteira.LIKRA += valor;

        let emprestimo = {
            valor,
            juros,
            parcelas,
            restante: valor + (valor * juros)
        };

        emprestimos.push(emprestimo);
        alert(`Empréstimo aprovado!\nValor: K$ ${valor}`);
    } else {
        alert("Fundo sem liquidez para empréstimo.");
    }
}

function pagarParcela(index) {
    let emp = emprestimos[index];
    if (!emp) return;

    let parcelaValor = emp.restante / emp.parcelas;

    if (carteira.LIKRA >= parcelaValor) {
        carteira.LIKRA -= parcelaValor;
        fundo.LIKRA += parcelaValor;

        emp.restante -= parcelaValor;
        emp.parcelas--;

        if (emp.parcelas <= 0) {
            emprestimos.splice(index, 1);
            alert("Empréstimo quitado!");
        }
    } else {
        alert("Likra insuficiente para pagar parcela.");
    }
}
// ===============================
// SALDO LIKRA EM TEMPO REAL (UI)
// ===============================
function atualizarSaldoUI(){
    let el = document.getElementById("saldoLikra");
    if(el){
        el.innerText = `K$ ${carteira.LIKRA.toFixed(2)}`;
    }
}

// Atualiza sempre
setInterval(atualizarSaldoUI, 1000);
