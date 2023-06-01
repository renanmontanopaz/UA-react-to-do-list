import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.jsonserver.io/',
    headers: {
        "X-Jsio-Token": "69008bbc053a751d077a2d69d13255ca"
    }
});