import { User } from '../../types/user.type';
import client from '../../database/index';
import UsersClass from '../userModel';

const model = new UsersClass;

describe('User Model', () => {
    describe('Methods are exists', () => {
        // describe('Have index Method', () => {
            it('Must have a index method', () => {
                expect(model.index).toBeDefined;
            })
        // })
        // describe('Have show Method', () => {
            it('Must have a show method', () => {
                expect(model.show).toBeDefined;
            })
        // })
        // describe('Have Creat Method', () => {
            it('Must have a create method', () => {
                expect(model.create).toBeDefined;
            })
        // })
        // describe('Have authenticate Method', () => {
            it('Must have a authenticate method', () => {
                expect(model.authenticate).toBeDefined;
            // })
        })
    })

})

describe('Logic of the Methods of user model', () => {

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


        it('it\'s  creat method should get a json object and return a user', async() => {

            const createdUser = await model.create({
                first_name: 'test',
                last_name: 'test',
                password: '123456'
            } as User)
// console.log('this is the creted user :' ,createdUser);

            expect(createdUser.id).toEqual(createdUser.id);
            expect(createdUser.first_name).toEqual('test');
            expect(createdUser.last_name).toEqual('test');
            

            // expect(createdUser).toEqual({
            //     id : createdUser.id ,
            //     first_name : 'test' ,
            //     last_name : 'test' ,
            //     password : createdUser.password
            // })
        })

        it('it\'s Get index all The users' ,async ()=>{
            const users = await model.index();
            expect(users.length).toBe(2);
        })

        it('it\'s show method by id return user' , async()=>{
            const userData = await model.show(user.id as string) 
            expect(userData.id).toBe(user.id);
            expect(userData.first_name).toBe(user.first_name);
            expect(userData.last_name).toBe(user.last_name);

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


})