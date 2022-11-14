const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { engine } = require('express-handlebars')

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

app.get('/', (req, res) => {
  res.render('index')
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
