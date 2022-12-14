const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// adding new todo page
router.get('/new', (req, res) => {
  res.render('new')
})

// post new todos
router.post('/', (req, res) => {
  const { name } = req.body

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

// get to todo detail
router.get('/:id', (req, res) => {
  const { id } = req.params
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((err) => console.error(err))
})

// get to todo edit page
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((err) => console.error(err))
})

// edit todo
router.put('/:id', (req, res) => {
  const { id } = req.params
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((err) => console.error(err))
})

// delete todo
router.delete('/:id', (req, res) => {
  const { id } = req.params
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

module.exports = router
