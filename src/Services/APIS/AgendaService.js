import GTP3Service from './GPT3Services'

const AgendaService = {
    async reorgarnizeTasks(userInput) {
        try {
            const prompt = `
            Organize automaticamente uma agenda semanal para uma pessoa, equilibrando trabalho e lazer com foco na saúde mental. 
            A IA deve identificar a prioridade com base no contexto das tarefas, distinguindo entre tarefas de trabalho e atividades de lazer. 
            Não é necessário especificar horários, mas é importante incluir o melhor período que essa tarefa pode ser feita.
            Segue as tarefas
            "${userInput}"
            Crie uma agenda equilibrada, levando em consideração o tempo de trabalho, pausas e tempo livre, sem sobrecarregar a pessoa. A IA deve entender o contexto e priorizar a saúde mental, 
            evitando sobrecarga com trabalho ou lazer. 
            Deve reconhecer o tipo da tarefa(exemplo: lazer, família, trabalho(qualquer tipo de trabalho existente)) e categoriza-la com o seu tipo correspondente ao contexto. 
            Fornecer o resultado em uma tabela organizada.
            `;
            const newTasks = await GTP3Service.getGTP3Response(prompt);
            
            return newTasks;
        } catch (error){ console.error('Erro ao reogarnizar as tarefas:', error)
        throw error;
            
        }
    }
};

export default  AgendaService;