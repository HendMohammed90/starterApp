import { Pool } from 'pg'
import config from '../config'

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: '',
  // port: parseInt(config.port as string, 10),
  max: 4
})

pool.on('error', (error: Error) => {
  console.error(`Error: ${error.message}`)
})

export default pool