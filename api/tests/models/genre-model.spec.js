const { Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Genre model', () => {
    beforeAll(async () => {
        await conn.sync({ force: true });
    });

    describe('Parte UNO', () => {
        it('No debe crear el genero sino trae el nombre', async () => {
        expect.assertions(1);
        try {
            await Genre.create({name: 'Action'});
        } catch (error) {
            expect(error.message).toBeDefined();
        }
    })})
    
    afterAll(async () => {
        await conn.sync({ force: true });
        conn.close();
    })
})