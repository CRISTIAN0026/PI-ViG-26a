const { Router } = require('express');
const router = Router();
const { allInfo, getDetails, getIdInDb  } = require('../controllers/getGames');

router.get('/', async (req, res) =>{
    let { name } = req.query
    let response = await allInfo()
    try {
        if (name) {
            let cou = await response.filter(e => e.name.toLowerCase()
            .includes(name.toLowerCase()));
            cou.length ?
            res.status(200).send(cou) :
            res.status(400).send('Game not found')
            }else {
                res.status(200).send(response); 
            }
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:id', async (req, res) =>{
    let { id } = req.params;
    let response = await getDetails(id);
    let re = await  getIdInDb(id)
    try {
        if(response.length > 0){
            res.send(response)
        }else if(re.length > 0){
            res.send(re)
        }else{
            res.status(400).send('game not found')
        }
    } catch (error) {
        return error
    }
})

module.exports = router;