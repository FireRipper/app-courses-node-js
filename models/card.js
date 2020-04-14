const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
)

class Card {

    /**
     * Add. Add course to card. If this course is in card (True: just update count in course; False: add new course to card)
     * @param {object} course
     * @return {Promise}
     */
    static async add(course) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            candidate.count++
            card.courses[idx] = candidate
        } else {
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise(((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if(err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        }))
    }

    /**
     * Remove. Remove course from card
     * @param id
     */
    static async remove(id) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === id)
        const course = card.courses[idx]

        if (course.count === 1) {
            card.courses = card.courses.filter( c => c.id !== id)
        } else {
            card.courses[idx].count--
        }

        card.price -= course.price

        return new Promise(((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if(err) {
                    reject(err)
                } else {
                    resolve(card)
                }
            })
        }))
    }

    /**
     * fetch. Get data from card.json
     * @return {Promise<unknown>}
     */
    static async fetch() {
        return new Promise(((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        }))
    }
}

module.exports = Card
