const { Router } = require('express');
const routerGenre = require('./routerGenre');
const routerGames = require('./routerGames');
const routerGame = require('./routerGame');
const routerPlatform = require('./routerPlatform');
const routerDelete = require('./routerDelete');
const routerPut = require('./routerPut');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', routerGenre);
router.use('/videogames', routerGames);
router.use('/videogames', routerGame);
router.use('/platform', routerPlatform);
router.use('/delete', routerDelete);
router.use('/put',routerPut )

module.exports = router;
