/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { Videogame, conn } = require('../../src/db.js');
const app = require('../../src/routes/index');



describe('Videogame routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  })

  describe("GET/videogames",() => {
    it("Deberia traer los video juegos pedidos en el readme ", async () => {
      const rex = await request(app).get('/videogames');
      expect(rex.statusCode).toBe(200);
    })
  })

  afterAll(() => {
    conn.close();
  })
});

jest.setTimeout(30000);