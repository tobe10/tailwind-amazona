import Product from "@/models/Product";
import db from "@/utils/db"

const handler = async (req, res) => {
    await db.connect();
    try {
        const product = await Product.findById(req.query.id);
        await db.disconnect();
        return res.send(product)
    } catch (e) {
        console.error('Failed to fetch product:', e);
        res.status(500).json({ message: 'Failed to fetch product' })
    }
}
export default handler;