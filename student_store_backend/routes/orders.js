const express = require("express")
const security = require("../middleware/security")
// const permissions = require("../middleware/permissions")
const Order = require("../models/orders")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try{
        const { user } = res.locals
        const orders = await Order.listOrdersForUser(user)
        return res.status(200).json({ orders })
    } catch(err) {
        next(err)
    }
})

router.post("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try{
        const { user } = res.locals
        const order = await Order.createOrder({ user, order: req.body})
        return res.status(201).json({ createOrder: order })
    } catch(err) {
        next(err)
    }
})

module.exports = router