// Variables
const $card = document.querySelector('#card')
const price = document.querySelectorAll('.price')

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

price.forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

// Events
if ($card) {
    $card.addEventListener('click', e => {
        if (e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id

            fetch(`/card/remove/${id}`, {
                method: 'delete'
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
