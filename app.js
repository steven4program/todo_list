const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')
const Todo = require('./models/todo')
const todo = require('./models/todo')

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/todo_list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')

app.use(express.urlencoded({ extended: true }))

// get to index page
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((todos) => res.render('index', { todos }))
    .catch((err) => console.error(err))
})

// adding new todo page
app.get('/todos/new', (req, res) => {
  res.render('new')
})

// post new todos
app.post('/todos', (req, res) => {
  const { name } = req.body

  return todo
    .create({ name })
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

// get to todo detail
app.get('/todos/:id', (req, res) => {
  const { id } = req.params
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((err) => console.error(err))
})

// get to todo edit page
app.get('/todos/:id/edit', (req, res) => {
  const { id } = req.params
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((err) => console.error(err))
})

// edit todo
app.post('/todos/:id/edit', (req, res) => {
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
app.post('/todos/:id/delete', (req, res) => {
  const { id } = req.params
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

app.use((err, req, res, next) => {
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(3000, () => {
  console.log(
    `App is running on http://localhost/${port}; ` +
      'press Ctrl-C to terminate.'
  )
})
