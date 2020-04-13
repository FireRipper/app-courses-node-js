const { Router } = require('express')

const router = Router()

module.exports = router.get('/', (req, res) => {
    res.render('add',  {
        title: 'Добавить курс',
        isAdd: true
    })
})
