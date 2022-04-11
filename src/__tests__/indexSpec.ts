import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('Get The main End Point / ', async () => {
    const response = await request.get('/')
    // console.log(response);
    expect(response.status).toBe(200)
  })
})
