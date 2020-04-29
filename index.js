const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv').config()
const csrf = require('csurf')
const flash = require('connect-flash')

const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')

const errorMiddleware = require('./middleware/error')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers')
})

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views') // Folder with layouts

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

// Middleware
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

// Register routes
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

app.use(errorMiddleware)

// Running app
async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(process.env.BASE_PORT, () => {
            console.log(`Server is running on port ${process.env.BASE_PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

