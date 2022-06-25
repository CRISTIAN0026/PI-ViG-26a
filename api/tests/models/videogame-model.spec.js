const { Videogame, conn } = require('../../src/db.js');

describe('Videogame model', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    console.log('Cri');
  });

  describe('Parte UNO', () => {
    it('no debe crear el personaje si no se envía el nombre', async () => {
      expect.assertions(1);
      try {
        await Videogame.create({image: 'Cristian', rating: 3});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })
});
