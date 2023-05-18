const express = require('express');
const Employee = require('../models/Employee');
const { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee,
    deleteEmployee,
    searchEmployee
} = require('../controllers/employeeController');

const router = express.Router();

router.route('/create').post(createEmployee)

router.route('/').get(getAllEmployees)

router.route('/:id')
    .get(getEmployeeById)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route('/search/:search').get(searchEmployee)

module.exports = router;