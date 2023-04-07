const dotenv = require('dotenv');
const app = require("./app");
const { connectDatabase } = require('./db/database');

dotenv.config();

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
