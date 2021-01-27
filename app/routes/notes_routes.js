const express = require('express')
const router = express.Router()
const Purchases = require('../models/purchases')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
// const removeBlanks = require('../../lib/remove_blank_fields')

router.post('/notes', requireToken, (req, res, next) => {
  const notesData = req.body.notes
  console.log(notesData)
  const purchaseId = notesData.purchaseId
  Purchases.findById(purchaseId)
    .then(handle404)
    .then(purchases => {
      purchases.notes.push(notesData)
      return purchases.save()
    })
    .then(purchases => res.status(201).json({ purchases: purchases }))
    .catch(next)
})

module.exports = router
