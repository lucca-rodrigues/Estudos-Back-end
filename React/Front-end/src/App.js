import React, { useState, useEffect } from 'react';

// useEffect  é utilizado para atualizar em tela os dados de um Item

import api from './services/api';

import './App.css';

function validadeProjectID(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json({ error: 'Invalid Project ID.'});
  }
  return next();
}

app.use('/repositories:id', validadeProjectID);

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Lucas Rodrigues'
    });

    const project = response.data;

    setProjects([...projects, project]); // Pega as informações e Adiciona a nova para o final da lista
  }

  return (
    <>
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}
export default App;
