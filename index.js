const express = require('express');
const app = express();
app.use(express.json());

// Substitua pela sua chave AIza...
const API_KEY = "AIzaSyBlkv8Rr8IM59dppp8Dn1aA8xYIPA4-r34"; 

app.post('/conversa', async (req, res) => {
    const mensagemDoJogador = req.body.message;

    // A URL correta baseada na sua lista de modelos disponíveis
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3-flash:generateContent?key=${API_KEY}`;

    const data = {
        contents: [{
            parts: [{
                text: `You are Ralsei from Deltarune. Personality: Cute, fluffy, prince, kind. Context: Talking to a Lightner in Roblox. Respond to: ${mensagemDoJogador}`
            }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Verifica se a API retornou o texto corretamente
        if (result.candidates && result.candidates[0].content.parts[0].text) {
            const respostaTexto = result.candidates[0].content.parts[0].text;
            res.json({ text: respostaTexto });
        } else {
            console.error("Resposta estranha do Google:", result);
            res.json({ text: "O-oh... I got confused. Could you say that again?" });
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
        res.json({ text: "S-Sorry! My connection to the Dark World is weak..." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ralsei is online via Direct Fetch!"));
