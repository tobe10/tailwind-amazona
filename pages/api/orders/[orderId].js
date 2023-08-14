import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react"

//api/orders/:orderId
const handler = async (req, res) => {
    const session = getSession({ req });
    if (!session) {
        return res.status(401).send('signing required!')
    }
    db.connect();
    const order = await Order.findById(req.query.orderId);
    db.disconnect();
    res.status(201).send(order)
}

export default handler