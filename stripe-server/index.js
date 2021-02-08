// server for stripe to recieve token and send
// charge info to api
const cors = require('cors')
const express = require('express')
const stripe = require('stripe')('sk_test_51IHMdiGycoFI2vKg6fwlPHPrCU5V8HjzlFdpB0HvcEZCbIO9paD3cAOGKpcrB52ct2pTQwyXa9bdmlCyDlys3pxf00SlMcFLB1')
const uuidV4 = require('uuid/v4')

const app = express()

// adding middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('This worked')
})

app.post('/checkout', async (req, res) => {
  console.log('Request: ', req.body)

  const { product, token } = req.body
  console.log('Product', product)
  console.log('Product Name ', product.product.name)

  // const customer = await
  // stripe.customers.create({
  //   email: token.email,
  //   source: token.id
  // })

  const idempotencyKey = uuidV4()

  // return a created customer from stripe
  return stripe.customers.create({
    email: token.email,
    source: token.id
  })
    .then(customer => {
      stripe.charges.create({
        amount: product.product.price * 100,
        currency: 'USD',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`
      },
      {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(error => console.log('Failed to get backednAPI', error))
})

app.listen(8080, () => console.log('listening on port 8080'))
