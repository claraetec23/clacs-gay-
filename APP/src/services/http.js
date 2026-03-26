export const request = async (url, options = {}) => {
    try {
        const res = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            ...options
        });

        if (!res.ok) {
            const msg = `Erro na API: ${res.status} ${res.statusText}`;
            throw new Error(msg);
        }

        return await res.json();

    } catch (error) {
        console.error("Erro HTTP:", error);
        alert("Erro ao conectar com a API");
        throw error;
    }
};