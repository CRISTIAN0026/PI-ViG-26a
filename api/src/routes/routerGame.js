const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require('../db');

router.post('/', async(req, res) =>{
    let { name, image, description, released, rating, platforms, genres } = req.body;
    try {

        let cat = await Videogame.findAll({where: { name: name }})

        if( name && description && platforms && (cat.length < 1)){
            let newGame = await Videogame.create({
                name,
                image,
                description,
                released,
                rating,
                platforms
            })
            let dbGenre = await Genre.findAll({
                where:{ name: genres }
            })
            newGame.addGenre(dbGenre);
            res.send(newGame)
        }else{
            res.status(400).send('Is already found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

module.exports= router;