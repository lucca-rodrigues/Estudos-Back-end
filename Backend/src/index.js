const express = require('express'); // importa o Express que acaba de ser instalado

const app = express();

app.get('/projects', (request, response) => {
  return response.json({message: 'Hello Worldd'});
});
app.listen(3333, () => {
  console.log('🚀 Back-end Started')
});