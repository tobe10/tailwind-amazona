const mongoose = require('mongoose');

async function connect() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/next-tailwind-amazona')
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