import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/excel/destinos';
const cargas = () => axios.get(baseUrl).then((resp: any) =>  resp.data);

export default cargas;

