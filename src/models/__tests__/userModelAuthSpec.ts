import { User } from '../../types/user.type';
import client from '../../database/index';
import UsersClass from '../userModel';


const model = new UsersClass();
describe('User Model', () => {

    // describe('Authenticate Model', () => {
        it('Must have a Authenticate method', () => {
            expect(model.authenticate).toBeDefined();
        })
    // })

})

describe('The Logic of Authenticate Method', ()=>{

const user:User={
    first_name : 'testUser' ,
    last_name : 'test3User' ,
    password :'123456'
};

beforeAll(async()=>{
    // const conn = await client.connect();
    const userCreated = await model.create(user);
    user.id =  userCreated.id;
    // console.log('this is the creted user :' ,userCreated);
    
})

    // describe('first it should get a user data correctly then return the user' , ()=>{
        it('the input data must be correct', async()=>{
            const userData = await model.authenticate(
                user.first_name ,
                user.password as string
            )
            // console.log(userData);
            

            // expect(userData?.first_name).toBe(user.first_name);
            // expect(userData?.last_name).toBe(user.last_name);
            expect(userData?.password).toBeDefined();
        })
    // })

    // describe('it shouldn\'t get a user data if the inputs are wrong should get null' , ()=>{
        it('the input data must be incomplete ', async()=>{
            const userData = await model.authenticate(
                'this is for wrong test' , 'this is for wrong test'
            );
            expect(userData).toBe(null);
        })
    // })

afterAll(async()=>{
    const conn = await client.connect();
    // const sql = '\nALTER SEQUENCE users_id_seq RESTART WITH 1; DELETE FROM users';
    // await conn.query(sql);
    const sql = '\nALTER SEQUENCE users_id_seq RESTART WITH 1;'
    const sql1 = 'DELETE FROM users';
    await conn.query(sql);
    await conn.query(sql1);
    conn.release();
})

})