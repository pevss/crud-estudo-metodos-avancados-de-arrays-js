"use strict";

//Elementos DOM

const btnAdicionarProduto = document.querySelector(".adicionar--produto");
const btnsSort = document.querySelectorAll(".tabela--texto");
const btnModalCancelar = document.querySelector(".modal--cancelar");
const btnModalAdicionar = document.querySelector(".modal--submit");
const btnFecharModal = document.querySelector(".modal i");
const btnModalEditarCancelar = document.querySelector(".modal--editar--cancelar");
const btnModalEditar = document.querySelector(".modal--editar--submit");
const btnFecharModalEditar = document.querySelector(".modal--editar i");
const btnModalExcluirCancelar = document.querySelector(".modal--excluir--cancelar");
const btnModalExcluir = document.querySelector(".modal--excluir--submit");
const btnFecharModalExcluir = document.querySelector(".modal--excluir i");

const inputFiltroTexto = document.querySelector(".input--filtro--texto");
const inputFiltroCategoria = document.querySelectorAll(".input--filtro--parametro");
const inputNomeProdutoModal = document.querySelector(".input--nome");
const inputPrecoProdutoModal = document.querySelector(".input--preco");
const inputNomeEditar = document.querySelector(".input--editar--nome");
const inputPrecoEditar = document.querySelector(".input--editar--preco");

const labelExcluir = document.querySelector(".modal--excluir--texto h1");
const labelEditar = document.querySelector(".modal--editar--texto h1");
const labelContador = document.querySelector(".contador");

const tabelaBase = document.querySelector(".tabela--itens");
const tabelaItens = document.querySelectorAll(".tabela--item");

const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal--overlay");
const modalExcluir = document.querySelector(".modal--excluir");
const modalOverlayExcluir =document.querySelector(".modal--excluir--overlay");
const modalEditar = document.querySelector(".modal--editar");
const modalOverlayEditar =document.querySelector(".modal--editar--overlay");

const fecharModal = [btnAdicionarProduto, btnFecharModal, modalOverlay, btnModalCancelar];
const fecharModalEditar = [btnFecharModalEditar, modalOverlayEditar, btnModalEditarCancelar];
const fecharModalExcluir = [btnFecharModalExcluir, modalOverlayExcluir, btnModalExcluirCancelar];


// Variáveis

const produtos = [
    {
      id: 35478,
      nome: "Camiseta",
      preco: 29.99
    },
    {
      id: 89123,
      nome: "Notebook",
      preco: 1299.99
    },
    {
      id: 56789,
      nome: "Tênis",
      preco: 59.99
    },
    {
      id: 12345,
      nome: "Livro",
      preco: 19.99
    },
    {
      id: 78901,
      nome: "Headphone",
      preco: 79.99
    },
];

let produtosFiltrado = [];
let iDprodutoExcluido, iDprodutoEditado;
labelContador.textContent = produtos.length; //setando o contador de produtos para a quantidade de produtos já existentes no sistema


// Funções

//Modals
const toggleModal = function(){
    modal.classList.toggle("escondido");
    modalOverlay.classList.toggle("escondido");
    inputNomeProdutoModal.value = inputPrecoProdutoModal.value = "";
    inputNomeProdutoModal.style.border = inputPrecoProdutoModal.style.border = "";
};

const toggleModalEditar = function(){
    modalEditar.classList.toggle("escondido");
    modalOverlayEditar.classList.toggle("escondido");

    inputNomeEditar.value = inputPrecoEditar.value = "";
    inputNomeEditar.style.border = inputPrecoEditar.style.border = "";
};

const toggleModalExcluir = function(){
    modalExcluir.classList.toggle("escondido");
    modalOverlayExcluir.classList.toggle("escondido");
};

//Funcionalidades do sistema

const mostrarProdutos = function(produtos, sort = false, parametro = false){
    tabelaBase.innerHTML = "";

    const produtosArr = sort ? produtos.slice().sort((a, b) => {
        if(parametro === "id") return a.id - b.id
        if(parametro === "preço") return a.preco - b.preco
        if(parametro === "nome") return a.nome.localeCompare(b.nome)
    }) : produtos;

    if(!produtosArr.length){
        const mensagemWrapper = document.createElement("tr");
        const mensagem = document.createElement("td");

        mensagemWrapper.classList.add("tabela--item");
        mensagem.colSpan = "5";
        mensagem.style.textAlign ="center";
        mensagem.style.color = "#78716C";
        mensagem.innerText = "Nenhum item adicionado... Ainda!";

        mensagemWrapper.append(mensagem);
        tabelaBase.append(mensagemWrapper);
    } else {
        produtosArr.forEach((el) => {
            const item = document.createElement("tr");
            item.classList.add("tabela--item");
    
            const colunaID = document.createElement("td");
            const colunaNome = document.createElement("td");
            const colunaPreco = document.createElement("td");

            const colunaEditar = document.createElement("td");
            const colunaExcluir = document.createElement("td");
    
            colunaID.classList.add("item", "item--id");
            colunaNome.classList.add("item", "item--nome");
            colunaPreco.classList.add("item", "item--preco");

            colunaEditar.classList.add("item", "item--editar");
            colunaExcluir.classList.add("item", "item--excluir");
    
            colunaID.textContent = el.id;
            colunaNome.textContent = el.nome;
            colunaPreco.textContent = el.preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

            colunaEditar.innerHTML = '<i class="ph-fill ph-pencil"></i>';
            colunaExcluir.innerHTML = '<i class="ph-fill ph-trash"></i>';

            colunaEditar.style.textAlign = colunaExcluir.style.textAlign = "center";

            colunaExcluir.addEventListener("click", function(){
                labelExcluir.textContent = "";
                labelExcluir.textContent += `Deseja realmente excluir "${Array.from(this.parentElement.children)[1].textContent}"?`;

                iDprodutoExcluido = Number(Array.from(this.parentElement.children)[0].textContent);

                toggleModalExcluir();
            });

            colunaEditar.addEventListener("click", function(){
                labelEditar.textContent = "";
                labelEditar.textContent += `Altere as informações desejadas sobre "${Array.from(this.parentElement.children)[1].textContent}".`;

                iDprodutoEditado = Number(Array.from(this.parentElement.children)[0].textContent);

                toggleModalEditar();
            });

            item.append(colunaID, colunaNome, colunaPreco, colunaEditar, colunaExcluir);
    
            tabelaBase.append(item);
        });
    };
};
mostrarProdutos(produtos); //inciando o sistema

const adicionarProduto = function(){
    inputNomeProdutoModal.focus();
    inputNomeProdutoModal.style.border = inputPrecoProdutoModal.style.border = ""

    if(inputNomeProdutoModal.value && inputPrecoProdutoModal.value && Number(inputPrecoProdutoModal.value.trim().replace(".", "").replace(",", "."))){
        const id = Math.floor(Math.random() * 100000);
        const nome = inputNomeProdutoModal.value.trim();
        const preco = Number(inputPrecoProdutoModal.value.trim().replace(".", "").replace(",", "."));
    
        produtos.push({id, nome, preco});

        Toastify({
            text: `"${inputNomeProdutoModal.value.trim()}" adicionado com sucesso!`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#1E40AF",
                fontFamily: "'Hanken Grotesk', sans-serif;",
                color: "#E7E5E4",
                zIndex: 4,
                boxShadow: "none",
                borderRadius: ".5rem",
                cursor: "default",
            },
        }).showToast();

        inputNomeProdutoModal.value = inputPrecoProdutoModal.value = "";
        inputNomeProdutoModal.classList.remove("relembrar");
        inputPrecoProdutoModal.classList.remove("relembrar");
    
        mostrarProdutos(produtos);
    } else {
        if(!inputPrecoProdutoModal.value || !Number(inputPrecoProdutoModal.value.trim().replace(".", "").replace(",", "."))){
            inputPrecoProdutoModal.style.border = "solid #B91C1C .05rem";
            inputPrecoProdutoModal.focus();
        };
        if(!inputNomeProdutoModal.value){
            inputNomeProdutoModal.style.border = "solid #B91C1C .05rem";
            inputNomeProdutoModal.focus();
        };
    };
};

const excluirProduto = function(id){
    const nomeExcluido = produtos[produtos.findIndex(el => el.id === id)].nome;

    Toastify({
        text: `"${nomeExcluido}" excluido com sucesso!`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "#B91C1C",
            fontFamily: "'Hanken Grotesk', sans-serif;",
            color: "#E7E5E4",
            zIndex: 4,
            boxShadow: "none",
            borderRadius: ".5rem",
            cursor: "default",
        },
    }).showToast();

    produtos.splice(produtos.findIndex(el => el.id === id), 1);

    toggleModalExcluir();

    mostrarProdutos(produtos);
};

const editarProduto = function(id){
    const produtoEl = produtos.findIndex(el => el.id === id);
    const nomeEditado = produtos[produtos.findIndex(el => el.id === id)].nome;
    const precoEditado = produtos[produtos.findIndex(el => el.id === id)].preco;

    if(inputNomeEditar.value || inputPrecoEditar.value){
        produtos[produtoEl].nome = inputNomeEditar.value ? inputNomeEditar.value : produtos[produtoEl].nome;
        produtos[produtoEl].preco = inputPrecoEditar.value ? Number(inputPrecoEditar.value.trim().replace(".", "").replace(",", ".")) : produtos[produtoEl].preco;

        Toastify({
            text: `"${nomeEditado} - ${precoEditado.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}" alterado para "${produtos[produtoEl].nome} - ${produtos[produtoEl].preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}".`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#1E40AF",
                fontFamily: "'Hanken Grotesk', sans-serif;",
                color: "#E7E5E4",
                zIndex: 4,
                boxShadow: "none",
                borderRadius: ".5rem",
                cursor: "default",
            },
        }).showToast();

        toggleModalEditar();

        mostrarProdutos(produtos);
    } else {
        inputNomeEditar.style.border = inputPrecoEditar.style.border = "solid #B91C1C .05rem";
    };
};


// Event Handlers

let sorted = false;

inputFiltroTexto.addEventListener("input", function(e){
    e.preventDefault();

    tabelaBase.innerHTML = "";

    if(sorted) sorted = false;
    
    btnsSort.forEach(el => {
        if(el.innerText.includes("▲")) el.innerText = `${el.innerText.slice(0, this.innerText.indexOf(" "))}`;
    });

    const filtroAtual = Array.from(inputFiltroCategoria).find(el => el.checked).value;
    
    const resultadoFiltrado = inputFiltroTexto.value ? produtos.filter(el => {
        if(typeof el[filtroAtual] === "number") return String(el[filtroAtual]).includes(`${inputFiltroTexto.value.trim().replace(".", "").replace(",", ".")}`);
        if(typeof el[filtroAtual] === "string") return String(el[filtroAtual]).toLowerCase().includes(`${inputFiltroTexto.value}`);
    }) : produtos;
    
    produtosFiltrado = resultadoFiltrado;

    if(!resultadoFiltrado.length && inputFiltroTexto.value){
        const mensagemWrapper = document.createElement("tr");
        const mensagem = document.createElement("td");
        mensagemWrapper.classList.add("tabela--item");
        mensagem.colSpan = "5";
        mensagem.style.textAlign ="center";
        mensagem.style.color = "#78716C";
        mensagem.innerText = "Nenhum resultado encontrado.";

        mensagemWrapper.append(mensagem);
        tabelaBase.append(mensagemWrapper);
    } else mostrarProdutos(resultadoFiltrado);

    labelContador.textContent = resultadoFiltrado.length;
});


btnModalAdicionar.addEventListener("click", function(e){
    e.preventDefault();
    adicionarProduto();
});

btnModalExcluir.addEventListener("click", function(e){
    e.preventDefault();
    excluirProduto(iDprodutoExcluido);
});

btnModalEditar.addEventListener("click", function(e){
    e.preventDefault();
    editarProduto(iDprodutoEditado);
});

btnsSort.forEach(el => {
    el.addEventListener("click", function(){
        if(!sorted){
            mostrarProdutos((inputFiltroTexto.value) ? produtosFiltrado : produtos, true, `${this.innerText.toLowerCase()}`);
            this.innerText = `${this.innerText} ▲`;
            sorted = true;
        } else {
            if(this.innerText.includes("▲")){
                this.innerText = `${el.innerText.slice(0, this.innerText.indexOf(" "))}`;
                mostrarProdutos((inputFiltroTexto.value) ? produtosFiltrado : produtos);
                sorted = false;
            } else {
                btnsSort.forEach(el => {
                    if(el.innerText.includes("▲")) el.innerText = `${el.innerText.slice(0, this.innerText.indexOf(" "))}`;
                });

                mostrarProdutos((inputFiltroTexto.value) ? produtosFiltrado : produtos, true, `${this.innerText.toLowerCase()}`);
                this.innerText = `${this.innerText} ▲`;
            };
        };
    });
});


fecharModal.forEach(el => {
    el.addEventListener("click", function(e){
        e.preventDefault();
        toggleModal();
    });
});

fecharModalExcluir.forEach(el => {
    el.addEventListener("click", function(e){
        e.preventDefault();
        toggleModalExcluir();
    });
});

fecharModalEditar.forEach(el => {
    el.addEventListener("click", function(e){
        e.preventDefault();
        toggleModalEditar();
    });
});

window.addEventListener("keydown", function(e){
    if(!modal.classList.contains("escondido") && e.key === "Escape") toggleModal();
    if(!modalExcluir.classList.contains("escondido") && e.key === "Escape") toggleModalExcluir();
    if(!modalEditar.classList.contains("escondido") && e.key === "Escape") toggleModalEditar();
});
