import { it, beforeAll, afterAll, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { describe } from 'node:test'
import { execSync } from 'node:child_process'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'new Transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransaction.get('Set-Cookie')

    const listedTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listedTransactions.body.data).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransaction.get('Set-Cookie')

    const listedTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listedTransactions.body.data[0].id

    const specificTransaction = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(specificTransaction.body).toEqual(
      expect.objectContaining({
        id: transactionId,
        title: 'New Transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to get transactions', async () => {
    const firstTransaction = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = firstTransaction.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get(`/transactions/summary`)
      .set('Cookie', cookies)
      .expect(200)

    const { summary } = summaryResponse.body

    expect(summary).toEqual({
      amount: 3000,
    })
  })
})
