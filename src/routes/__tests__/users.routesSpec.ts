import supertest from 'supertest'
import app from '../../index'
import { User } from '../../types/user.type';
import client from '../../database/index';
import UsersClass from '../../models/userModel';

const model = new UsersClass;

// eslint-disable-next-line prefer-const
let token = ''


// create a request object
const request = supertest(app)


describe('USER API endPoints', () => {
    const user: User = {
        first_name: 'testUser',
        last_name: 'test3User',
        password: '123456'
    };

    beforeAll(async () => {
        // const conn = await client.connect();
        const userCreated = await model.create(user);
        user.id = userCreated.id;
        // console.log(userCreated);

    })

    afterAll(async () => {
        const conn = await client.connect();
        // const sql = 'DELETE FROM users';
        const sql = '\nALTER SEQUENCE users_id_seq RESTART WITH 1;'
        const sql1 = 'DELETE FROM users';
        await conn.query(sql);
        await conn.query(sql1);
        conn.release();
    })


    describe('Testing the get endpoint', async () => {
        const response = await request.get('/');
        // console.log(response);
        expect(response.status).toBe(200)
    })


    describe('Testing the post endpoint', async () => {
        const createdUser = await model.create({
            first_name: 'TestT',
            last_name: 'User2',
            password: 'test123',
        } as User)
        const res = await request.post('/api/users/').set('Content-type', 'application/json').send({
            first_name: 'TestT',
            last_name: 'User2',
            password: 'test123',
        } as User);
        console.log('data :',  res.body.data);
        
        // const res = await request
        //     .post('/api/users/')
        //     .set('Content-type', 'application/json')
        //     .set('Authorization', `Bearer ${token}`)
        //     .send({
        //         first_name: 'TestTow',
        //         last_name: 'TestTow',
        //         password: '12345',
        //     } as User)
        // const { id, first_name, last_name } = res.body.data;
        // console.log(token);


        expect(res.status).toBe(200);
        expect(createdUser.first_name).toBe('TestTow');
        expect(createdUser.last_name).toBe('TestTow');
    })

    // describe('Test Authenticate methods', () => {
    //     it('should be able to authenticate to get token', async () => {
    //         const res = await request
    //             .post('/api/users/authenticate')
    //             .set('Content-type', 'application/json')
    //             .send({
    //                 first_name: 'TestTow',
    //                 password: '12345',
    //             })
                
    //         expect(res.status).toBe(200)
    //         const { id, first_name,token: userToken} = res.body.data;
    //         console.log('data: ', res.body.data);

    //         expect(id).toBe(user.id)
    //         expect(first_name).toBe('TestTow')
    //         token = userToken

    //     })

    //     it('should be failed to authenticate with wrong email', async () => {
    //         const res = await request
    //             .post('/api/users/authenticate')
    //             .set('Content-type', 'application/json')
    //             .send({
    //                 email: 'wrong@email.com',
    //                 password: 'test123',
    //             })
    //         expect(res.status).toBe(401)
    //     })
    // })


    // describe('Testing the getOne data by ID endpoint ', () => {
    //     it('Should get an Id and return', async () => {
    //         const res = await request
    //             .get(`/api/users/${user.id}`)
    //             .set('Content-type', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send({
    //                 first_name: 'TestTow',
    //                 password: '12345',
    //             } as User);

    //         expect(res.status).toBe(200);

    //     })
    // })
})
