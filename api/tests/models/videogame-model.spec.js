const { Videogame, conn } = require('../../src/db.js');

describe('Videogame model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('Cri');
  });

  describe('Model', () => {
    it('No debe crear el personaje si no se envía el "name"', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({description: 'CR9 21 ', rating: 3});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('No debe crear el pesonaje sino se envia la "descripcion"', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({name: "Mario", released: "30/04/2002", image: 'https://www.trecebits.com/wp-content/uploads/2019/11/GITHUB.jpg', rating: 4, platforms:["Playstation 5"]})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    })

    it('No debe crear el pesonaje sino se envia la "Platforms" o "Rating"', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({name: "Mario", released: "30/04/2002", image: 'https://www.trecebits.com/wp-content/uploads/2019/11/GITHUB.jpg', rating: 4})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    })

    it('Deberia crear el personaje si todo esta OK', async () => {
      const game = await Videogame.create({
        name: 'Jesus',
        rating: 3,
        description: "Ramon fue por dos panes y regreso con uno",
        platforms:["Playstation 5"]

      })
      expect(game.toJSON()).toEqual({
        id:game.id,
        name: 'Jesus',
        rating: 3,
        description: "Ramon fue por dos panes y regreso con uno",
        platforms:["Playstation 5"],
        released: null,
        image: null
      });
    });
  })

  
});
