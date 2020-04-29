module.exports = function (email, token) {
    return {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: 'Восстановление доступа',
        html: `
        <h1>Вы забыли пароль?</h1>
        <p>Если нет, то проигнорируйте данное письмо</p>
        <p>Иначе, перейдите по ссылке ниже: </p>
        <p><a href="${process.env.BASE_URL}/auth/password/${token}">Восстановить доступ</a></p>
        <hr />
        <a href="${process.env.BASE_URL}">Магазин курсов</a>
        `
    }
}
