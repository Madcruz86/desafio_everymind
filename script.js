document.addEventListener('DOMContentLoaded', function () {
    const formCadastrar = document.querySelector('form');
    const tabelaProdutos = document.getElementById('tabelaProdutos');

    function carregarProdutos() {
        axios.get('http://localhost:3000/api/produtos')
            .then(response => {
                const produtos = response.data;
                tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de adicionar as novas linhas
                tabelaProdutos.insertAdjacentHTML('beforeend', '<tr><th>Código</th><th>Nome</th><th>Descrição</th><th>Preço</th><th>Alterar / Remover</th></tr>');
                produtos.forEach(produto => {
                    tabelaProdutos.insertAdjacentHTML('beforeend', `<tr>
                        <td>${produto.codigo}</td>
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.preco}</td>
                        <td>
                            <button onclick="editarProduto(${produto.id})">Editar</button>
                            <button onclick="deletarProduto(${produto.id})">Deletar</button>
                        </td>
                    </tr>`);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

    formCadastrar.addEventListener('submit', function (event) {
        event.preventDefault();
        const codigo = document.getElementById('codigo').value;
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value;
        const preco = document.getElementById('preco').value;

        axios.post('http://localhost:3000/api/produtos', { codigo, nome, descricao, preco }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                carregarProdutos(); // Atualiza a tabela após cada cadastro
                formCadastrar.reset();
            })
            .catch(error => console.error('Erro ao cadastrar produto:', error));
    });

    window.deletarProduto = function (produtoId) {
        axios.delete(`http://localhost:3000/api/produtos/${produtoId}`)
            .then(response => {
                console.log(response.data);
                carregarProdutos(); // Atualiza a tabela após cada exclusão
            })
            .catch(error => console.error('Erro ao deletar produto:', error));
    };

    window.editarProduto = function (produtoId) {
        const novoNome = prompt("Digite o novo nome para o produto:");
        if (novoNome !== null) {
            const novaDescricao = prompt("Digite a nova descrição para o produto:");
            const novoPreco = prompt("Digite o novo preço para o produto:");

            const dadosAtualizados = {
                nome: novoNome,
                descricao: novaDescricao,
                preco: novoPreco
            };

            axios.put(`http://localhost:3000/api/produtos/${produtoId}`, dadosAtualizados, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                carregarProdutos(); 
            })
            .catch(error => console.error('Erro ao editar produto:', error));
        }
    };

    carregarProdutos();
});



