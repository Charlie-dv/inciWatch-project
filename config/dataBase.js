require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.database_url;
mongoose.connect(url)
.then(()=>{
    console.log('connection to database successfully');
})

.catch((error)=>{
    console.error('error connecting to database:', error.message);
})