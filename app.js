const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const routes = require('./routes')

const port = process.env.PORT || 3000

require('./config/mongoose')

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'expelliarmus',
    resave: false,
    saveUninitialized: true
  })
)

usePassport(app)

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(3000, () => {
  console.log(
    `App is running on http://localhost/${port}; ` +
      'press Ctrl-C to terminate.'
  )
})
