const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyAPzfl08jDd7xO8uweurTL17czm5W5hKGs");

app.post('/conversa', async (req, res) => {
    const mensagemDoJogador = req.body.message;

    try {
        // Mudança para o modelo estável padrão
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 

        const prompt = `You are Ralsei, the fluffy prince from Deltarune. 
        Personality: Selfless, caring, loving, cute, comforting, and very fluffy. 
        Context: You are in the Light World talking to a Lightner. 
        Respond in English to: ${mensagemDoJogador}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text: text });
    } catch (error) {
        console.error("Erro detalhado:", error);
        res.json({ text: "I-I'm sorry... I feel a bit dizzy. Could you say that again?" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ralsei is ready!"));
