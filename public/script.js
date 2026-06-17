function analisar() {

    const texto = document.getElementById("mensagem").value.toLowerCase();

    let score = 0;
    let motivos = [];

    const palavras = [
     
    // PIX / DINHEIRO
    "pix",
    "transferência",
    "ted",
    "depósito",
    "pagamento",
    "boleto",
    "dinheiro",
    "valor",
    "taxa",
    "multa",
    "pague",
    "envie dinheiro",
    "faz um pix",
    "manda o pix",
    "me empresta",
    "me ajuda",
    "preciso urgente",
    "estou sem acesso ao banco",
    "conta bloqueada",
    "conta suspensa",

    // URGÊNCIA
    "urgente",
    "agora",
    "rápido",
    "imediatamente",
    "neste momento",
    "última chance",
    "não demora",
    "corre",
    "pra já",
    "é urgente",
    "resolve agora",
    "precisa ser hoje",

    // LINKS
    "clique no link",
    "acesse o link",
    "abra o link",
    "link abaixo",
    "confirme no link",
    "entre nesse site",
    "site oficial",
    "link seguro",
    "clique aqui",
    "http",
    "https",

    // DADOS PESSOAIS
    "confirme seus dados",
    "confirme sua conta",
    "senha",
    "cpf",
    "rg",
    "cartão",
    "número do cartão",
    "cvv",
    "código de segurança",
    "token",
    "código",
    "verificação",
    "dados bancários",
    "foto do documento",
    "selfie",
    "envie seu cpf",
    "digite sua senha",

    // AMEAÇAS
    "bloqueio",
    "processo",
    "processo judicial",
    "sua conta será bloqueada",
    "cancelamento",
    "negativado",
    "nome sujo",
    "dívida",
    "juros",
    "protesto",
    "penhora",
    "ação judicial",
    "intimação",
    "polícia",

    // TROCA DE NÚMERO
    "mudei de número",
    "novo número",
    "troquei de celular",
    "me chama aqui",
    "salva meu novo contato",

    // FALSOS PRÊMIOS
    "ganhou",
    "prêmio",
    "sorteio",
    "você foi selecionado",
    "parabéns",
    "resgate agora",
    "cupom",
    "dinheiro grátis",
    "cashback",
    "benefício",
    "promoção imperdível",

    // EMPRESAS
    "nubank",
    "caixa",
    "mercado pago",
    "picpay",
    "paypal",
    "banco do brasil",
    "itau",
    "bradesco",
    "santander",
    "receita federal",
    "correios",
    "suporte técnico",
    "central de atendimento",

    // EMOCIONAL
    "estou desesperado",
    "preciso da sua ajuda",
    "não conta pra ninguém",
    "confia em mim",
    "é segredo",
    "família",
    "mãe",
    "pai",
    "filho",
    "acidente",
    "hospital",

    // ENTREGA
    "taxa de entrega",
    "produto retido",
    "pedido bloqueado",
    "liberar encomenda",
    "alfândega",

    // INVESTIMENTO
    "bitcoin",
    "criptomoeda",
    "investimento garantido",
    "lucro garantido",
    "renda extra",
    "dobro do valor",
    "retorno imediato",

    // OUTROS
    "suporte",
    "acesso remoto",
    "teamviewer",
    "anydesk",
    "instale o aplicativo",
    "baixar aplicativo",
    "liberação",
    "segurança",
    "tentativa de acesso",
    "atividade suspeita",
    "confirmação necessária",
    "cadastro",
    "atualização obrigatória",
    "verifique sua identidade"

    ];

    palavras.forEach(palavra => {
        if (texto.includes(palavra)) {
            score += 10;
            motivos.push("Palavra suspeita: " + palavra);
        }
    });

    if (texto.includes("http")) {
        score += 20;
        motivos.push("Link detectado");
    }

    if (texto.includes("r$")) {
        score += 20;
        motivos.push("Valor monetário detectado");
    }

    let nivel = "";

    if (score >= 50) {
        nivel = "ALTO RISCO";
    } else if (score >= 25) {
        nivel = "MÉDIO RISCO";
    } else {
        nivel = "BAIXO RISCO";
    }

    let cor = "green";

    if (nivel === "ALTO RISCO") {
        cor = "red";
    } else if (nivel === "MÉDIO RISCO") {
        cor = "orange";
    }

    document.getElementById("resultado").innerHTML = `
        <h3>Resultado: ${nivel}</h3>
        <p>Score: ${score}</p>

        <div class="barra-container">
            <div class="barra" 
                 style="width:${score}%; background:${cor};">
            </div>
        </div>

        <ul>
            ${motivos.map(m => `<li>${m}</li>`).join("")}
        </ul>
    `;

    document.getElementById("ia-status").innerText =
        "🧠 IA analisando padrões...";
}