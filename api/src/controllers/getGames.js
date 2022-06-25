const axios = require('axios');
const { Genre, Videogame } = require('../db');
const  response51  = require('../plat/Platform')

const getApiInfo = async () =>{
    try {
        let response = (await axios(`https://api.rawg.io/api/games?key=8add5b0008ac41029ef27f4754c5f16f`)).data
        let res = (await axios(`${response.next}`)).data
        let res1= (await axios(`${res.next}`)).data
        let res2= (await axios(`${res1.next}`)).data
        let res3= (await axios(`${res2.next}`)).data 
        let all =[...response.results, ...res.results, ...res1.results, ...res2.results, ...res3.results]
    let api = all.map(g =>{
        return({
            id: g.id,
            name: g.name,
            rating: g.rating,
            image: g.background_image,
            genres: g.genres.map(g =>{
                return{name: g.name}
            })
        })
    })
    return api
    } catch (error) {
        return error
    }
}

const getDbInfo = async() =>{
    try {
        return await Videogame.findAll({
            include:{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    } catch (error) {
        return error
    }
}

const allInfo = async() =>{
    try {
        let apiIfo = await getApiInfo();
        let dbInfo = await getDbInfo();
        let all = apiIfo.concat(dbInfo);
        return all
    } catch (error) {
        return error
    }    
}

const getDetails = async(id) =>{
    try {
        let response = (await axios(`https://api.rawg.io/api/games/${id}?key=8add5b0008ac41029ef27f4754c5f16f`)).data
        let res = [response]
        let api = res.map(d => {
            return {
                id: d.id,
                name: d.name,
                description: d.description,
                image: d.background_image,
                released: d.released,
                rating: d.rating,
                genres: d.genres?.map(g =>{
                    return{name: g.name }
                }),
                platforms: d.platforms?.map(p =>{
                    return{
                        platform: p.platform.name
                    }
                })
            }
        })
        return api
    } catch (error) {
        return error
    }
}


const getIdInDb = async(id) =>{
    try {
        let response = await Videogame.findAll({
            where:{id: id},
            include:{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        return response
    } catch (error) {
        return error
    }
}

const getPlatform = async() =>{
    try {
        
        let rex = response51.map(r => {
            return{
                name: r.name
            }
        })
        return rex
    } catch (error) {
        return error
    }
}
module.exports = {
    getApiInfo,
    getDbInfo,
    allInfo,
    getDetails,
    getIdInDb,
    getPlatform
}