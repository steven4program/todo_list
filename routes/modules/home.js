const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// get to index page
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos }))
    .catch((err) => console.error(err))
})

module.exports = router
