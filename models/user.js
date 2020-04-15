const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course', // Reference with table (model) 'Course' - relationship !!!!
                    required: true
                }
            }
        ]
    }
})
// Use word function because in future we'll work with word 'this'.
// Don't use Arrow Func
/**
 * addToCart. Get course from DB, check course in user cart (true: add just count + 1, false: add id course and count 1).
 * @param {object} course
 * @return save course to database.
 */
userSchema.methods.addToCart = function (course) {
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })
    if (idx >= 0) {
        items[idx].count = items[idx].count + 1
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    // const newCart = { items: clonedItems }
    // this.cart = newCart

    this.cart = { items }

    return this.save()
}

/**
 * removeFromCart. Get element by Id from array cart in user and remove 1 this item.
 * @param {string} id
 * @return {Promise|void|*} save remove
 */
userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]
    const idx = items.findIndex(c => c.courseId.toString() === id.toString())

    if (items[idx].count === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[idx].count--
    }

    this.cart = { items }
    return this.save()
}

/**
 * clearCart. Remove all items from model userSchema.cart
 * @return {Promise|void|*}
 */
userSchema.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save()
}

module.exports = model('User', userSchema)
