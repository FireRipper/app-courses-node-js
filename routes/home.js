const { Router } = require('express')

const router = Router()

module.exports = router.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страница',
        isHome: true
    })
})
