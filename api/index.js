
const connectDB = require('./db');
const server = require('./app');


connectDB();


const PORT=process.env.PORT || 3001
server.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})