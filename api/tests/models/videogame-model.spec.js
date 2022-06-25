const { Videogame, conn } = require('../../src/db.js');

describe('Videogame model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('Cri');
  });

  describe('Model', () => {
    it('No debe crear el personaje si no se envía el nombre', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({description: 'CR9 21 ', rating: 3});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('No debe crear el pesonaje sino se envia la descripcion', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({name: "Mario", released: "30/04/2002"})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    })

  })
});
