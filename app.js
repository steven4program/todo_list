const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT

require('./config/mongoose')

app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // success message
  res.locals.warning_msg = req.flash('warning_msg') // warning message
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(
    `App is running on http://localhost/${PORT}; ` +
      'press Ctrl-C to terminate.'
  )
})
