const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Caminho para o arquivo do banco de dados
const dbPath = path.join(__dirname, 'produtos.db');

const db = new sqlite3.Database(dbPath);

db.run('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY, codigo TEXT, nome TEXT, descricao TEXT, preco REAL)');

app.get('/api/produtos', (req, res) => {
    db.all('SELECT * FROM produtos', (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao buscar produtos' });
        }
        res.json(rows);
    });
});

app.post('/api/produtos', (req, res) => {
    const { codigo, nome, descricao, preco } = req.body;
    db.run('INSERT INTO produtos (codigo, nome, descricao, preco) VALUES (?, ?, ?, ?)', [codigo, nome, descricao, preco], function(err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao cadastrar produto' });
        }
        res.json({ mensagem: 'Produto cadastrado com sucesso', id: this.lastID });
    });
});

app.put('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    db.run('UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?', [nome, descricao, preco, id], function(err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao editar produto' });
        }
        res.json({ mensagem: 'Produto editado com sucesso' });
    });
});

app.delete('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM produtos WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao deletar produto' });
        }
        res.json({ mensagem: 'Produto deletado com sucesso' });
    });
});


app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
});



