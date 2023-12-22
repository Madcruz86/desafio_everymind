//Função para adicionar uma nova linha na tabela
function addToTable() {

    //Definindo as variaveis e recebendo os dados
    let name = document.getElementById('name').value;
    let cod = document.getElementById('cod').value;
    let desc = document.getElementById('desc').value;
    let price = document.getElementById('price').value;
    let table = document.getElementById("tabelaProdutos");

    let tableSize = table.rows.length; //Calculando o tamanho da Tabela
    let row = table.insertRow(tableSize); //Inserindo uma linha abaixo da Tabela
    let cell1 = row.insertCell(0); //Inserindo as celulas da linha
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    row.id = tableSize; //Adicionando o id no elemento a ser criado

    //Criando o codigo do botão para remover a linha
    let btnCode = "<button class='remove-btn' onclick='removeToTable(this)'>Remover</button>";

    //Preenchendo as celulas da linha
    cell1.innerHTML = cod;
    cell2.innerHTML = name;
    cell3.innerHTML = desc;
    cell4.innerHTML = price;
    cell5.innerHTML = btnCode;

    //Limpando os campos de inserção de dados
    document.getElementById('name').value = "";
    document.getElementById('cod').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('price').value = "";

    //Retornando 'false' para impedir o reload da pagina
    return false;
}

//Função para remover uma linha
function removeToTable(id){

    let row = id.parentNode.parentNode.id; //Pegando o id do avô do botão
    row = document.getElementById(row); //Recebendo o elemento da linha pelo ID
    row.parentNode.removeChild(row); //Removendo a linha

    //Retornando 'false' para impedir o reload da pagina
    return false;
}