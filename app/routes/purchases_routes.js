// / Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Purchases = require('../models/purchases')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const removeBlanks = require('../../lib/remove_blank_fields')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// index route
router.get('/purchases', requireToken, (req, res, next) => {
  Purchases.find()
    .then((purchases) => {
      for (let i = 0; i < purchases.length; i++) {
        if (purchases[i].owner.toString() === req.user.id) {
          console.log(purchases[i])
          return purchases[i]
        }
      }
    })
    .then(purchases => {
      res.status(200).json({ purchases: purchases })
    })
    .catch(next)
})

// create route
router.post('/purchases', requireToken, (req, res, next) => {
  req.body.purchases.owner = req.user.id
  Purchases.create(req.body.purchases)
    .then(purchases => {
      res.status(201).json({ purchases: purchases })
    })
    .catch(next)
})

// update route
router.patch('/purchases/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.purchases.owner
  Purchases.findById(req.params.id)
    .then(handle404)
    .then(purchases => {
      requireOwnership(req, purchases)
      return purchases.updateOne(req.body.purchases)
    })
    .then(() => res.sendStatus(202))
    .catch(next)
})

module.exports = router
