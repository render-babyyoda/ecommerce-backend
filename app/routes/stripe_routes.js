const express = require('express')
const stripe = require('stripe')('sk_test_51IHMdiGycoFI2vKg6fwlPHPrCU5V8HjzlFdpB0HvcEZCbIO9paD3cAOGKpcrB52ct2pTQwyXa9bdmlCyDlys3pxf00SlMcFLB1')
// const uuidV4 = require('uuid/v4')
const { v4: uuidV4 } = require('uuid')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/checkout', (req, res, next) => {
  const { cookie, token } = req.body
  const idempotencyKey = uuidV4()

  // return a created customer from stripe
  return stripe.customers.create({
    email: token.email,
    source: token.id
  })
    .then(customer => {
      stripe.charges.create({
        amount: cookie.price * 100,
        currency: 'USD',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${cookie.name}`
      },
      {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(error => console.log('Failed to get backednAPI', error))
})

module.exports = router
