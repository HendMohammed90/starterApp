import { User } from '../types/user.type'
import client from '../database/index'
import bcrypt from 'bcrypt';
import config  from '../config';

const hashPass = (pass: string) => {
    const salt = parseInt(config.salt as string, 10)
    return bcrypt.hashSync(`${pass}${config.pepper}`, salt)
  }
  

export class UsersClass {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT id ,first_name , last_name FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get all users: ${(err as Error).message}`)
        }
    }

    async show(id: string):Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT id ,first_name , last_name FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user with that id=${id}: ${(err as Error).message}`)

        }
    } 

    //remove for the project
    async updateOne(user: User):Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET first_name =$1 , last_name =$2 ,password = $3 WHERE id=$4  RETURNING id ,first_name , last_name';
            const result = await conn.query(sql, [user.first_name ,user.last_name , user.password , user.id]);
            conn.release()
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not Update user with that id=${user.id}: ${(err as Error).message}`)

        }
    } 

    async create(user: User): Promise<User> {
        try {
            // Create a new connection to the database
            const connection = await client.connect()
            // Create a query to select all data
            const sql =
                'INSERT INTO users (first_name, last_name ,password) VALUES($1, $2, $3) RETURNING id ,first_name , last_name '
                // Execute the query
            const result = await connection.query(sql, [
                user.first_name,
                user.last_name,
                hashPass(user.password)
            ])
            connection.release() // Release the connection

            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Could not creat user (${user.first_name}): ${(err as Error).message}`
            )
        }
    }

    //remove for the project
    async deleteOne(id: string):Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)  RETURNING id ,first_name , last_name';
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not Delete user with that id=${id}: ${(err as Error).message}`)

        }
    } 


}

export default UsersClass;
