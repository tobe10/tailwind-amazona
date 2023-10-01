
// require('dotenv').config();
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGO_URI
async function connect() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongodbUri)
            .then(() => console.log('Connected to database'))
            .catch((error) => console.error(error));
    } else {
        console.log('Already connected to database');
    }
}
async function disconnect() {
    if (mongoose.connection.readyState === 1) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
        }
    }
}
const db = { connect, disconnect }

export default db