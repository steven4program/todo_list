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
