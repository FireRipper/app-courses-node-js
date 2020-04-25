const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views') // Folder with layouts

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}))
app.use(varMiddleware)

// Register routes
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000

// Running app
async function start() {
    try {
        const url = `mongodb+srv://illia:YNnPzj1l0R7xb8GI@cluster0-dcvzy.mongodb.net/shop`
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        // const candidate = await User.findOne()
        //
        // if (!candidate) {
        //     const user = new User({
        //         email: 'shabelnyk.ilya@mail.ru',
        //         name: 'Illia',
        //         cart: { items: [] }
        //     })
        //     await user.save()
        // }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

