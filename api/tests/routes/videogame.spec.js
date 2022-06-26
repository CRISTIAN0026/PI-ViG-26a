/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { conn } = require('../../src/db.js');
const app = require('../../src/app');



describe('Videogame routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  })

  describe("GET/videogames",() => {
    it("Deberia traer los video juegos pedidos en el readme ", async () => {
      const rex = await request(app).get('/videogames');
      expect(rex.statusCode).toBe(200);
    })

    it("Deberia traer un juego por su nombre ", async () => {
      const rat = await request(app).get('/videogames?name=Grand Theft Auto V')
      expect(rat.statusCode).toBe(200)
      expect(rat.body).toEqual([
        {
          id: 3498,
          name: "Grand Theft Auto V",
          rating: 4.47,
          image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
          genres: [
            {
              name: "Action"
            },
            {
              name: "Adventure"
            }
          ]
        }
      ])
    })

    it("Deberia traer un juego por (id)", async() =>{
        const ref = await request(app).get('/videogames/3498')
        expect(ref.statusCode).toBe(200)
        expect(ref.body).toEqual([
        {
          id: 3498,
          name: "Grand Theft Auto V",
          description: "<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>",
          image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
          released: "2013-09-17",
          rating: 4.47,
          genres: [
            {
              name: "Action"
            },
            {
              name: "Adventure"
            }
          ],
          platforms: [
            {
              platform: "PC"
            },
            {
              platform: "Xbox Series S/X"
            },
            {
              platform: "PlayStation 4"
            },
            {
              platform: "PlayStation 3"
            },
            {
              platform: "Xbox 360"
            },
            {
              platform: "Xbox One"
            },
            {
              platform: "PlayStation 5"
            }
          ]
        }
      ])
    })
  })
  describe("POST/videogames", () => {
    it("Deberia crear un video juego", async () =>{ 
      const rpg = await request(app).post('/videogames')
      .send({name: 'Cristian', 
      image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', 
      description:"asdsadasdadasdasdas", 
      released: "21/09/1997",
      rating: 5,
      genres: ["Action", "Adventure"],
      platforms: [
        "PlayStation 4"
      ]});
      expect(rpg.statusCode).toBe(200);
      expect(rpg.body).toEqual({
        id: rpg.body.id,
        name: "Cristian",
        image: "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        description: "asdsadasdadasdasdas",
        released: "21/09/1997",
        rating: 5,
        platforms: [
          "PlayStation 4"
        ]
      })
    })
  })
  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
  
});

jest.setTimeout(20000)
