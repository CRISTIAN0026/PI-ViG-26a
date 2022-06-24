const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db');

router.delete('/:id', async (req, res) =>{
    try {
        let {id} = req.params;
        let rta =await Videogame.destroy({
            where: {id}
        })
        res.json(rta)
    } catch (error) {
        res.send(error)
    }
})

module.exports=router;