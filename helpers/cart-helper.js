/**
 * mapCartItems. Get array and map this.
 * @param {array} cart
 * @return {array} array
 */
function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc,
        id: c.courseId.id,
        count: c.count
    }))
}

/**
 * computePrice. Get price and count from array, and sum them value.
 * @param {array} courses
 * @return {number} total sum
 */
function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

module.exports = {
    mapCartItems,
    computePrice
}
