import { restful } from '@indigoichigo/network';

const request = restful({ baseURL: 'https://jsonplaceholder.typicode.com', useAuth: false });

const localRequest = restful({ baseURL: 'http://127.0.0.1:8010', useAuth: false });

export { request, localRequest };
