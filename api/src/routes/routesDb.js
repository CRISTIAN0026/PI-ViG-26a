const { Router } = require('express');
const router = Router();
const { getDbInfo } = require('../controllers/getGames');

router.get('/', async(req, res) =>{
    try {
        let response = await getDbInfo()
        res.send(response)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports=router;