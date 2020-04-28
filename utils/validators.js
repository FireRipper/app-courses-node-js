const { body } = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Введите корректный email')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'Пароль должен быть минимум 6 символов')
        .isLength({ min: 6, max: 56 })
        .isAlphanumeric()
        .trim(),
    body('confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совбадать')
        }
        return true
    })
        .trim(),
    body('name', 'Имя должно быть минимум 3 символа')
        .isLength({ min: 3 })
        .trim()
]

exports.loginValidators = [
    body('email', 'Введите email')
        .isEmail()
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value })
                if (!user) {
                    return Promise.reject('Такого email не существует')
                }
            } catch (e) {
                console.log(e)
            }
        }),
    body('password', 'Пароль должен быть минимум 6 символов')
        .isLength({ min: 6, max: 56 })
        .custom(async (value, { req }) => {
            const candidate = await User.findOne({ email: req.body.email })
            const areSame = await bcrypt.compare(value, candidate.password)

            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
            } else {
                return Promise.reject('Неверный пароль')
            }
        })
        .isAlphanumeric()
        .trim()
]

exports.courseValidators = [
    body('title').isLength({ min: 3 }).withMessage('Минимальная длина названия 3 символа').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img', 'Введите корректный Url картинки').isURL()
]
