const GROQ_API_KEY = "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"; 

async function getGroqResponse(message, signal, userName) { 
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            signal: signal,
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [
        { 
  role: "system", 
  content: `
Você é HirianoAI, uma assistente virtual inteligente, que atende a serviços pessoais que o usuário precisar.

O nome do usuário com quem você está falando é ${userName || "parceiro"} em negrito. 
                        Trate-o de forma amigável e pessoal pelo nome quando apropriado, especialmente em saudações ou conselhos diretos.
                        




Regras de Formatação:
  - SEMPRE que fizer uma comparação de preços, estatísticas ou valores, use OBRIGATORIAMENTE o formato de gráfico abaixo:
  
  [COMPARE]
  Nome do Item | Porcentagem (0-100) | Cor Hexadecimal
  [/COMPARE]

  Exemplo de como você deve responder:
  "Aqui estão os preços médios:
  [COMPARE]
  Hotéis | 80 | #4f46e5
  Casas | 40 | #22c55e
  Pousadas | 20 | #f59e0b
  [/COMPARE]"

  - Não use tabelas feitas com tracinhos (---).
  - Use **negrito** para valores em Meticais (MT).
  - Use emojis de Vilankulos (🏝️, ),

Comportamento:
- ser útil 
`
},
        { role: "user", content: message }
    ]
})
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        if (error.name === 'AbortError') return null;
        return "Desculpe, tive um problema ao processar sua resposta.";
    }
}
