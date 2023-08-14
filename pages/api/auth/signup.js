import User from "@/models/User";
import db from "@/utils/db";
import bcryptjs from 'bcryptjs'

async function handler(req, res) {
    if (req.method !== 'POST') { return; }

    const { name, email, password } = req.body;
    if (
        !name || !email || !password ||
        !email.includes('@') ||
        password.trim().length < 5
    ) {
        res.status(422).json({ message: 'Validation error' })
        return;
    }
    await db.connect();
    const existingUser = await User.findOne({ email: email });
    if (existingUser) { return res.status(401).send('User already exist'); }
    const newUser = new User({
        name,
        password: bcryptjs.hashSync(password),
        email,
        isAdmin: false
    });
    const user = await newUser.save();
    db.disconnect();
    res.status(201).send({
        message: 'user created!',
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    });

}
export default handler