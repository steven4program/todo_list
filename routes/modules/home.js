const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// get to index page
router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos }))
    .catch((err) => console.error(err))
})

module.exports = router
