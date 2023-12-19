import axios from 'axios';

export const API_URL_LOGIN = 'http://localhost:8080/usuario/login';
export const API_URL_CADASTRO = 'http://localhost:8080/usuario/cadastrar';

class AgendaService {
  getUsuarioAgendas() {
    return axios.get(API_URL + 'usuario/agendas');
  }
}

export default new AgendaService();

/* Axios.post( ', data, 
      ).then(response => {
      console.log(response)
      navigate('/agenda')
    }).catch(error => {
      const message = error.response?.data?.message || 'Ocorreu um erro durante o login.';
      console.error(message, error);
    }) */