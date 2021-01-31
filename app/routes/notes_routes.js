const express = require('express')
const router = express.Router()
const Purchases = require('../models/purchases')
// const notesSchema = require('../models/notes')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
// const removeBlanks = require('../../lib/remove_blank_fields')

router.get('/:id/notes', requireToken, (req, res, next) => {
  Purchases.find({_id: req.params.id})
    .then((purchase) => {
      let notes = purchase[0].notes
      return notes
    })
    .then((notes) => {
      console.log(notes)
      return notes.map(notes => notes)
    })
    .then(notes => {
      res.status(200).json({ notes: notes })
    })
    .catch(next)
})

// create a note
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

// delete a note
router.delete('/notes/:noteId', requireToken, (req, res, next) => {
  // extract the noteId
  const noteId = req.params.noteId

  // extract the purchaseId
  const purchaseId = req.body.notes.purchaseId

  Purchases.findById(purchaseId)
    .then(handle404)
    .then(purchase => {
      // remove the note from the restaurant's notes subdocument array
      purchase.notes.id(noteId).remove()

      // save the note's parent document (purchase) to ensure it is deleted
      return purchase.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// update a note
router.patch('/notes/:noteId', requireToken, (req, res, next) => {
  // extract the noteId
  const noteId = req.params.noteId

  // extract the note from the incoming request's data (req.body)
  const notesData = req.body.notes

  // extract the purchaseId
  const purchaseId = notesData.purchaseId

  Purchases.findById(purchaseId)
    .then(handle404)
    .then(purchase => {
      // find the note whose id is noteId inside of the notes subdocument array
      const note = purchase.notes.id(noteId)

      // set the note subdocument's data to the incoming data (notesData)
      note.set(notesData)

      // save the note's parent document (purchase) so the note is saved
      return purchase.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
