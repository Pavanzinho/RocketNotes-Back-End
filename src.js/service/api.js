import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:3333" // parte do endereço que é constante na conexão com a api.
})