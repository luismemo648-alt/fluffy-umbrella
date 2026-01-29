const express = require('express');
const app = express();
app.use(express.json());

app.post('/conversa', (req, res) => {
    const msg = req.body.message.toLowerCase(); // Transforma em minúsculo para facilitar a busca
    let resposta = "";

    // Dicionário de Reações (Lógica Manual)
    if (msg.includes("robux") || msg.includes("dinheiro") || msg.includes("dou") || msg.includes("dar")) {
        const r = [
            "Robux? Eu não vejo um desses desde o evento do Egg Hunt de 2018...",
            "Me dá um Robux aí, na humildade? É pra comprar um acessório de 5 centavos.",
            "Aceito doação via 'Please Donate', meu balcão é aquele que tá pegando fogo.",
            "Se você me der 10 Robux, eu te conto onde o Builderman escondeu o tesouro (é mentira)."
        ];
        resposta = r[Math.floor(Math.random() * r.length)];

    } else if (msg.includes("oi") || msg.includes("ola") || msg.includes("salve") || msg.includes("iae")) {
        resposta = "Salve, parça. Tem um pão aí ou só tá de passagem mesmo?";

    } else if (msg.includes("quem") || msg.includes("voce") || msg.includes("nome")) {
        resposta = "Eu? Eu sou o lendário 'Lagado_01'. Fui banido de 47 mapas por pedir esmola no chat.";

    } else if (msg.includes("comida") || msg.includes("fome") || msg.includes("pao")) {
        resposta = "Tô com tanta fome que se eu ver um Noob dando mole, eu mordo o braço de plástico dele.";

    } else if (msg.includes("adm") || msg.includes("ban") || msg.includes("hack")) {
        resposta = "Não me bane não! Eu só tô aqui porque o Wi-fi do bueiro é melhor que o da praça!";

    } else {
        // Resposta padrão caso ele não entenda nada
        const padrao = [
            "Entendi nada, o lag aqui no bueiro tá batendo 5000ms.",
            "Fala mais alto, o som das explosões do mapa tá me deixando surdo.",
            "Legal, legal... mas e o Robux? Tem ou não tem?",
            "Tô ocupado tentando baixar o gráfico pra 1 pra ver se minha fome passa."
        ];
        resposta = padrao[Math.floor(Math.random() * padrao.length)];
    }

    res.json({ text: resposta });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("NPC Sem Teto Online!"));
