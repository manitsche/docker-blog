const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Array para armazenar posts (simulando um banco de dados)
const posts = [];

// Configurar rota para receber os dados do formulário
app.post('/posts', (req, res) => {
  const { titulo, conteudo } = req.body;

  const imagem = req.files.imagem; // 'imagem' é o nome do campo no formulário

  // Caminho onde o arquivo será salvo
  const uploadPath = path.join(__dirname, 'uploads', imagem.name);

  // Mover o arquivo para o destino
  imagem.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Salvar os dados no array de posts (simulando um banco de dados)
    posts.push({ titulo, conteudo, imagemPath: uploadPath });

    // Redirecionar para a página de exibição de posts
    res.redirect('/posts');
  });
});

// Rota GET para exibir posts
app.get('/posts', (req, res) => {
  // Renderizar uma página HTML com os posts
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Posts</title>
    </head>
    <body>
      <h1>Posts</h1>
      <ul>
        ${posts.map(post => `<li>${post.titulo} - ${post.conteudo}</li>`).join('')}
      </ul>
    </body>
    </html>
  `;
  res.sendFile(path.join(__dirname, 'index.html'))
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/posts`);
});
