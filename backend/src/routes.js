const express = require('express');
const OngController = require('.\\controllers\\OngController');
const CasoController = require('.\\controllers\\CasoController');
const ProfileController = require('.\\controllers\\ProfileController');
const SessionController = require('.\\controllers\\SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Controller ONG
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

// Controller CASOS
routes.post('/casos', CasoController.create);
routes.get('/casos', CasoController.index);
routes.delete('/casos/:id', CasoController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;