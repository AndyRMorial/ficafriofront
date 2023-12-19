import axios from "axios";

const apiKey = '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'
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'

const GTP3Service = {
    async getGTP3Response(prompt) {
        try { 
            const response = await axios.post(apiUrl, {
                prompt: prompt,
                max_totens:100
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'content-type': 'application/json'
                }
            }); 
            return response.data.choices[0].text;
        } catch (error) {
            console.error('Erro ao fazer solicitações para o chat', error);
            throw error;
        }
    }
}

export default GTP3Service;