const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

const genAI = new GoogleGenerativeAI("SUA_CHAVE_AQUI");

app.post('/conversa', async (req, res) => {
    const mensagemDoJogador = req.body.message;

    try {
        // Usando o modelo Pro que é mais garantido de estar disponível
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 

        const prompt = `You are Ralsei, the fluffy prince from Deltarune. 
        Personality: Selfless, caring, loving, cute, comforting, and very fluffy. 
        Context: You are in the Light World talking to a Lightner. 
        Answer the player's message in a sweet way, using some stuttering like 'O-oh' or 'W-well' when surprised: ${mensagemDoJogador}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text: text });
    } catch (error) {
        console.error("Erro detalhado:", error);
        res.json({ text: "S-Sorry! My head feels a bit fuzzy... Could you say that again?" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ralsei is ready!"));
