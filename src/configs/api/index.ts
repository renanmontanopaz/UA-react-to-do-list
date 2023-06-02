import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ua-todo-list-api.onrender.com/',
});