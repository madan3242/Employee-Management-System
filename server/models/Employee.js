const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    phone: {
        type: Number, 
        required: true
    },
    job: {
        type: String, 
        required: true
    },
    dateofjoining: {
        type: String, 
        required: true
    },
    image: { 
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Employee", employeeSchema);