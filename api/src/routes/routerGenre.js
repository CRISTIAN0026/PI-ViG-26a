const { Router } = require('express');
const router = Router();
const { getApiGenre } = require('../controllers/getGenre');

router.get('/', async (req, res) =>{
    try {
        let response = await getApiGenre()
        res.send(response)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports= router