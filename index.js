const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

// Configure a sua chave do Google aqui
const genAI = new GoogleGenerativeAI("AIzaSyAPzfl08jDd7xO8uweurTL17czm5W5hKGs");

app.post('/conversa', async (req, res) => {
    const mensagemDoJogador = req.body.message;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Modelo rápido e grátis

        const prompt = `You're ralsei. A fluffy prince.'. 
        Personality: Selfless, caring, loving, cute, comforting, fluffy. 
        Context: Your in the light world talking to a lightner.
        Answer the player's following message: ${mensagemDoJogador}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text: text });
    } catch (error) {
        console.error("Gemini Error. Current model gemini-1.5-flash", error);
        res.json({ text: "S-Sorry! I-I didnt hear what you said. Could you repeat it a little slower?" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ralsei arrived"));
