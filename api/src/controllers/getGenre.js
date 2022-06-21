const axios = require('axios');
const { Genre } = require('../db');


const getApiGenre = async() =>{
    try {
        let response = (await axios(`https://api.rawg.io/api/genres?key=${process.env.YOUR_API_KEY}`)).data.results
    let api = await response.map(g => {
        return({name: g.name})
    })
    api.map(g => {
        Genre.findOrCreate({
            where:{name: g.name}
        })
    })
    let res = await Genre.findAll()
    return res
    } catch (error) {
        return error
    }
}

module.exports= {
    getApiGenre
}