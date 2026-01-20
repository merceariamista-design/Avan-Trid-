// ===============================
// SISTEMA ORSILAN
// ===============================
const SISTEMA = "Orsilan";
const TAXA = 0.03;

// Mercado de moedas
let mercado = {
    LIKRA: 3.44,
    TER: 1.22,
    FUG: 2.90,
    DEP: 8.44,
    POLO: 13.87,
    TIGER: 7.56
};

// Carteira do jogador
let carteira = {
    LIKRA: 1000,
    TER: 0,
    FUG: 0,
    DEP: 0,
    POLO: 0,
    TIGER: 0
};

// Fundo central
let fundo = {
    LIKRA: 0,
    TER: 0,
    FUG: 0,
    DEP: 0,
    POLO: 0,
    TIGER: 0
};

// ===============================
// COMPRA / VENDA
// ===============================
function comprar(moeda, qtd = 1){
    let preco = mercado[moeda] * qtd;
    let taxa = preco * TAXA;
    let total = preco + taxa;

    if(carteira.LIKRA >= total){
        carteira.LIKRA -= total;
        carteira[moeda] += qtd;
        fundo.LIKRA += taxa;
    }
}

function vender(moeda, qtd = 1){
    if(carteira[moeda] >= qtd){
        let preco = mercado[moeda] * qtd;
        let taxa = preco * TAXA;
        carteira[moeda] -= qtd;
        carteira.LIKRA += (preco - taxa);
        fundo.LIKRA += taxa;
    }
}

// ===============================
// VARIAÇÃO DE MERCADO
// ===============================
setInterval(()=>{
    for(let m in mercado){
        let v = (Math.random()*0.1 - 0.05);
        mercado[m] += mercado[m]*v;
        mercado[m] = Number(mercado[m].toFixed(2));
    }
},10000);

// ===============================
// TÍTULOS
// ===============================
let titulos = [];

function comprarTitulo(valor, juros=0.1, tempo=30){
    if(carteira.LIKRA >= valor){
        carteira.LIKRA -= valor;
        fundo.LIKRA += valor;
        titulos.push({valor, juros, tempo, criado:Date.now(), resgatado:false});
    }
}

setInterval(()=>{
    let agora = Date.now();
    titulos.forEach(t=>{
        if(!t.resgatado && agora - t.criado >= t.tempo*1000){
            let lucro = t.valor*t.juros;
            carteira.LIKRA += t.valor + lucro;
            fundo.LIKRA -= lucro;
            t.resgatado = true;
        }
    });
},5000);

// ===============================
// EMPRÉSTIMOS
// ===============================
let emprestimos = [];

function pedirEmprestimo(valor, juros=0.15, parcelas=5){
    if(fundo.LIKRA >= valor){
        fundo.LIKRA -= valor;
        carteira.LIKRA += valor;
        emprestimos.push({
            restante: valor + valor*juros,
            parcelas
        });
    }
}

function pagarParcela(i){
    let e = emprestimos[i];
    if(!e) return;
    let v = e.restante / e.parcelas;
    if(carteira.LIKRA >= v){
        carteira.LIKRA -= v;
        fundo.LIKRA += v;
        e.restante -= v;
        e.parcelas--;
        if(e.parcelas <= 0) emprestimos.splice(i,1);
    }
}

// ===============================
// UI – SALDO E CARTEIRA
// ===============================
setInterval(()=>{
    let s = document.getElementById("saldoLikra");
    if(s) s.innerText = `K$ ${carteira.LIKRA.toFixed(2)}`;

    let c = document.getElementById("carteiraJogador");
    if(c){
        c.innerHTML="";
        for(let m in carteira){
            c.innerHTML += `<div class="moeda"><span>${m}</span><strong>${carteira[m].toFixed(2)}</strong></div>`;
        }
    }
},1000);

// ===============================
// BOTÕES DO MERCADO
// ===============================
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelectorAll(".buy").forEach(b=>{
        b.onclick=()=>comprar(b.dataset.moeda);
    });
    document.querySelectorAll(".sell").forEach(b=>{
        b.onclick=()=>vender(b.dataset.moeda);
    });
});
