const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// adding new todo page
router.get('/new', (req, res) => {
  res.render('new')
})

// post new todos
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name } = req.body

  return Todo.create({ name, userId })
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

// get to todo detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((err) => console.error(err))
})

// get to todo edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((err) => console.error(err))
})

// edit todo
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({ _id, userId })
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch((err) => console.error(err))
})

// delete todo
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

module.exports = router
