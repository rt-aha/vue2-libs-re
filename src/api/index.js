import { restful } from '@indigoichigo/network';

const request = restful({ baseURL: 'https://jsonplaceholder.typicode.com', useAuth: false });
export default request;
