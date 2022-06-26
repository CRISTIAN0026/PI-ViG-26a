const request = require('supertest');
const { conn } = require('../../src/db.js');
const app = require('../../src/app');



describe("Genre routes", () =>{
    beforeAll(async () => {
        await conn.sync({ force: true });
    })

    it("Deberia traer los genres de la API", async () =>{
        const rex = await request(app).get('/genres');
        expect(rex.statusCode).toBe(200);
}) 

afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
})

