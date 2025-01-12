const db = require("../db")

class Store {

    static async listProducts() {
        const results = await db.query(
            `
            SELECT  p.id,
                    p.name,
                    p.category,
                    p.image,
                    p.description,
                    p.price
            FROM products AS p
            ORDER BY p.id DESC
            `
        )
        return results.rows
    }
}

module.exports = Store