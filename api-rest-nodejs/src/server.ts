import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  return await knex('sqlite_schema').select('*')
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Server listening on port 3333')
  })
