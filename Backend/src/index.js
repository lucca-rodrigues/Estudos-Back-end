const express = require('express'); // importa o Express que acaba de ser instalado

const app = express();

app.get('/projects', (request, response) => {
  return response.send('Hello World'); // Permite retornar um texto
});
app.listen(3333);