const request = require('supertest');
const app = require('../index');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

beforeAll(async () => {
    await prisma.user.deleteMany(); // Clear the user table before testing
});
  
afterAll(async () => {
    await prisma.$disconnect(); // Close Prisma connection
});

describe('GET /', () => {
    test('It should respond with an array of users', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('data');
    });
});

describe('POST /', () => {
    test('It should respond with a new user', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({
                email: 'boby@gmail.com',
                password: 'password',
                name: 'Boby',
            });
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('data');
        expect(response.body.status === 'success');
    });
})