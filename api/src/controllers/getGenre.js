const axios = require('axios');
const { Genre } = require('../db');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getApiGenre = async() =>{
    try {
        let response = (await axios(`https://api.rawg.io/api/genres?key=8add5b0008ac41029ef27f4754c5f16f`)).data.results
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