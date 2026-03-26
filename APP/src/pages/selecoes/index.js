import {
    getSelecoes,
    createSelecao,
    updateSelecao,
    deleteSelecao
} from "../../services/selecoes.service.js";

const app = document.getElementById("app");

app.innerHTML = `
    <h1>Seleções</h1>

    <form id="form">
        <input id="nome" placeholder="Nome" required />
        <input id="grupo" placeholder="Grupo" required />
        <input id="logo" placeholder="Logo URL" required />
        <button>Salvar</button>
    </form>

    <div id="lista"></div>
`;

const listaEl = document.getElementById("lista");
const form = document.getElementById("form");

let editandoId = null;

async function carregar() {
    try {
        const lista = await getSelecoes();
        render(lista);
    } catch (e) {
        console.error("Erro ao carregar:", e);
        listaEl.innerHTML = "<p>Erro ao conectar com a API</p>";
    }
}


function render(lista) {
    listaEl.innerHTML = "";

    lista.forEach(s => {
        listaEl.innerHTML += `
            <div class="card">
                <img src="${s.logo}" />
                <h3>${s.nome}</h3>
                <p>Grupo ${s.grupo}</p>

                <div class="acoes">
                    <button data-edit="${s.id}">Editar</button>
                    <button data-delete="${s.id}">Excluir</button>
                </div>
            </div>
        `;
    });

  
    document.querySelectorAll("[data-delete]").forEach(btn => {
        btn.onclick = async () => {
            await deleteSelecao(btn.dataset.delete);
            carregar();
        };
    });


    document.querySelectorAll("[data-edit]").forEach(btn => {
        btn.onclick = () => {
            const s = lista.find(x => x.id == btn.dataset.edit);

            document.getElementById("nome").value = s.nome;
            document.getElementById("grupo").value = s.grupo;
            document.getElementById("logo").value = s.logo;

            editandoId = s.id;
        };
    });
}


form.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
        nome: document.getElementById("nome").value,
        grupo: document.getElementById("grupo").value,
        logo: document.getElementById("logo").value,
        jogadores: []
    };

    try {
        if (editandoId) {
            await updateSelecao(editandoId, data);
            editandoId = null;
        } else {
            await createSelecao(data);
        }

        form.reset();
        carregar();

    } catch (e) {
        console.error("Erro ao salvar:", e);
    }
};

carregar();