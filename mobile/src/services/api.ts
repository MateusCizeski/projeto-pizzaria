import axios from 'axios';

const api = axios.create({
    baseURL: 'https://meuservidorubuntu.com.br/api/restaurant',
});

export { api };