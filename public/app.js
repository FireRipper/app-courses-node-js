// Variables
const $card = document.querySelector('#card')
const price = document.querySelectorAll('.price')
const date = document.querySelectorAll('.date')
const tabs = document.querySelectorAll('.tabs')


// Init elements materialize
M.Tabs.init(tabs)

// Functions
/**
 * To currency. Convert price to valid view.
 * @param price
 * @return {string}
 */
const toCurrency = price => {
    return new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

/**
 * toDate. Convert date to normal view '15 апреля 2020 г., 17:03:10'
 * @param {string} date
 * @return {string} normal date
 */
const toDate = date => {
    return new Intl.DateTimeFormat('ru-Ru', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}


// Convert some data
price.forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

date.forEach(node => {
    node.textContent = toDate(node.textContent)
})

// Events
if ($card) {
    $card.addEventListener('click', e => {
        if (e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id
            const csrf = e.target.dataset.csrf

            fetch(`/card/remove/${id}`, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(card => {
                    if (card.courses.length) {
                        const html = card.courses.map(c => {
                            return `
                            <tr>
                              <td>${c.title}</td>
                              <td>${c.count}</td>
                              <td>
                                <button class="btn btn-small js-remove" data-id=${c.id}>Удалить</button>
                              </td>
                            </tr>
                            `
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.price)
                    } else {
                        $card.innerHTML = `<p>Корзина пуста</p>`
                    }
                })
        }
    })
}

