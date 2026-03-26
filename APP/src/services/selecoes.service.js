import { request } from "./http.js";
import { routes } from "../config/routes.js";

export const getSelecoes = () => request(routes.selecoes);

export const createSelecao = (data) =>
    request(routes.selecoes, {
        method: "POST",
        body: JSON.stringify(data)
    });

export const updateSelecao = (id, data) =>
    request(`${routes.selecoes}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

export const deleteSelecao = (id) =>
    request(`${routes.selecoes}/${id}`, {
        method: "DELETE"
    });