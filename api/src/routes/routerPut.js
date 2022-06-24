const { Router } = require('express');
const router = Router();
const { Videogame } = require('../db');

router.put('/', async (req, res) =>{
    try {
        const response = await Videogame.update(
            {rating: 1},
            {where: {
                name: "Cristian",
            }}
        )
        res.status(200).send(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports=router;