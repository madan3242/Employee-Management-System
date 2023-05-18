require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRouter = require('./routers/employeeRouter');

const app = express();

app.use(express.json());
app.use(cors())

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`MONGODB CONNECTED`))
    .catch((error) => {
        console.log(`MONGODB CONNECTION FAILED`);
        console.log(error);
        process.exit(1);
    })
}

app.get('/',(req, res) => {
    res.send(`<h1>Employee Management System</h1>`)
})

app.use('/employee', employeeRouter)

app.listen(5000, process.env.HOSTNAME, (error) => {
    connect();
    if(error) throw error;
    console.log(`Server running in port 5000`);
})