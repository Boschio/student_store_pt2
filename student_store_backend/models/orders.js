const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Order {
    // FIXME need to complete this
    static async listOrdersForUser(user) {
        //will return all orders that the authenticated user has created
        const results = await db.query(
            `
            `, []
        )
        const orders = results.rows[0]

        if(!orders) {
            throw new NotFoundError()
        }
        return orders
    }
    
    // FIXME below is currently not working as intended
    static async createOrder({order, user}) {
        //will take a user's order and store it in the database
        const requiredFields = ["customerId"]
        requiredFields.forEach(field => {
            if (!order.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        const orderResults = await db.query(
            `
            INSERT INTO orders (id, customer_id)
            VALUES ($1, (SELECT id FROM users WHERE email = $2))
            RETURNING   id,
                        customer_id AS "customerId",
                        created_at AS "createdAt"                     
            `, [order.id, user.email]
        )

        // return results.rows[0]
        const orderId = orderResults.rows[0].id

        // const results = 
        order.forEach((item) => {
            `
            INSERT INTO order_details (order_id, product_id, quantity)
            VALUES ((SELECT id FROM orders WHERE order_id = $1), $2, $3)
            RETURNING   order_id AS "orderId",
                        product_id_id AS "productId",
                        quantity                     
            `, [orderId, item.productId, item.quantity]
        })
        // return results.rows[0]
    }
}

module.exports = Order