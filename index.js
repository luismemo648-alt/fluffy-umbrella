const express = require('express');
const app = express();
app.use(express.json());

// Substitua pela sua chave real aqui
const API_KEY = "AIzaSyBlkv8Rr8IM59dppp8Dn1aA8xYIPA4-r34"; 

app.post('/conversa', async (req, res) => {
    // Agora recebemos a tabela 'history' que vem do Roblox
    const chatHistory = req.body.history; 

    // Usando o Gemini 3 Flash (que tem 20 RPD na sua lista)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent?key=${API_KEY}`;

    const data = {
        // Definimos a personalidade como Instrução de Sistema
        system_instruction: {
            parts: [{ 
                text: "You are Ralsei from Deltarune. Personality: Cute, fluffy, prince, kind. Context: Talking to a Lightner. STRICT RULE: Your response must be maximum 60 words." 
            }]
        },
        // Enviamos o histórico completo para a IA ter memória
        contents: chatHistory,
        generationConfig: {
            maxOutputTokens: 80, // Garante que a IA não gaste tokens demais
            temperature: 0.8
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Extrai a resposta considerando o formato de histórico
        if (result.candidates && result.candidates[0].content.parts[0].text) {
            const respostaTexto = result.candidates[0].content.parts[0].text;
            res.json({ text: respostaTexto });
        } else {
            console.error("Resposta inesperada:", result);
            res.json({ text: "O-oh... I think I forgot what we were talking about." });
        }

    } catch (error) {
        console.error("Erro no servidor:", error);
        res.json({ text: "S-Sorry! I feel a bit dizzy... can we try again?" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Ralsei is online with Chat History!"));
