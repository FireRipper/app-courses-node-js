const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    /**
     * Update. Get 1 course by id from courses.json and update them fields.
     * @param course
     * @return {Promise<unknown>}
     */

    static async update(course) {
        const courses = await Course.getAll()

        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course

        return new Promise(((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        }))
    }

    /**
     * Save. Get all data from courses.json, push object (our course) to array and write him in courses.json
     * @return {Promise<unknown>}
     */

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())

        return new Promise(((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        }))
    }

    /**
     * GetAll. Get all courses from courses.json
     * @return {Promise<unknown>}
     */
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    /**
     * getById. Get course by id from courses.json
     * @param id
     * @return {Promise<*|number|bigint|T|T>}
     */
    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }
}

module.exports = Course
