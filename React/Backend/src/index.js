const express = require('express'); // importa o Express que acaba de ser instalado
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4'); //Cria um id unico

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(request, response, next){
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); // Próximo middleware
}

function validadeProjectID(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json({ error: 'Invalid Project ID.'});
  }
  // interrompe a requisição se o ID não for Válido.

  return next();
}
app.use(logRequests);

app.use('/projects:id', validadeProjectID);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  // é um loop como se fosse um Else IF
  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;
  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner }; 

  projects.push(project);
  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id); // procura o ID e o seu índice

  if (projectIndex < 0 ) {
    return response.status(400).json({ error: 'not found!'}); // Retorna o erro se nao houver o index com o Status code 400
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project); // retorna o projeto atualizado e não a lista de projetos

});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id); // procura o ID e o seu índice

  if (projectIndex < 0 ) {
    return response.status(400).json({ error: 'not found!'}); // Retorna o erro se nao houver o index com o Status code 400
  }

  projects.splice(projectIndex, 1); // Pega o Elemento do índice na posição 1.

  return response.status(204).send(); // retorna uma resposta em branco

});
app.listen(3333, () => {
  console.log('🚀 Back-end Started');
});