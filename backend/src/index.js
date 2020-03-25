const express = require('express');
const cors = require('cors');
const routes = require('.\\routes');
const app =  express();

app.use(cors());
app.use(express.json());
app.use(routes);
// *** MÉTODOS HTTP
// GET: Buscar uma informação do BackEnd
// POST: Criar uma informação no BackEnd
// PUT: Alterar uma informação no BackEnd
// DELETE: Deletar uma informação no BackEnd

// *** TIPOS DE PARÂMETROS
// Query Params: Parametros enviados na rota após "?" 
//        (Filtros, paginação, etc.)
// Route Params: Parâmetros usados para identificar recursos
// Request Body: Corpo da requisição usado para criar / alterar


app.listen(3333);