import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_DB ,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  ENV,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
} = process.env

export default {
  port: PORT,
  host :POSTGRES_HOST ,
  database : POSTGRES_DB ,
  testDatabase :POSTGRES_TEST_DB ,
  user :POSTGRES_USER ,
  env :ENV ,
  pepper : BCRYPT_PASSWORD  ,
  salt :SALT_ROUNDS
}
