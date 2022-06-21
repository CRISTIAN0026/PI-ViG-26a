const { Router } = require('express');
const router = Router();
const { getPlatform } = require('../controllers/getGames');

router.get('/', async (req, res) => {
    try {
        let response = await getPlatform()
        res.send(response)
    } catch (error) {
        return error
    }
})

module.exports= router;