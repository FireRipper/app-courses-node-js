const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('all-courses',  {
        title: 'Курсы',
        isCourses: true
    })
})


module.exports = router
