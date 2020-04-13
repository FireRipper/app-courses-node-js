const { Router } = require('express')

const router = Router()

module.exports = router.get('/', (req, res) => {
    res.render('all-courses',  {
        title: 'Курсы',
        isCourses: true
    })
})
