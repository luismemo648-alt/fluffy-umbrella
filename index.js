const express = require('express');
const { OpenAI } = require('openai'); // Importa a inteligência
const app = express();

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Sua chave secreta fica guardada aqui
});

app.post('/conversa', async (req, res) => {
    const mensagemDoJogador = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Modelo rápido e barato
            messages: [
                { 
                    role: "system", 
                    content: "Você é um NPC sem teto no jogo Roblox. Você é engraçado, levemente ranzinza, usa gírias de internet e sempre tenta pedir um Robux no final. Suas respostas devem ser curtas para caber no balão de fala do jogo." 
                },
                { role: "user", content: mensagemDoJogador }
            ],
        });

        const respostaDaIA = completion.choices[0].message.content;
        res.json({ text: respostaDaIA });
        
    } catch (error) {
        console.error("Erro na OpenAI:", error);
        res.json({ text: "Minha cabeça tá doendo... deve ser a fome." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Cérebro ligado na porta ${PORT}`));
