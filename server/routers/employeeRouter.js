const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

router.route('/create').post(
    async(req, res) => {
        try {
            const employee = new Employee(req.body);
            await employee.save();
            res.status(201).send(employee);
        } catch (error) {
            res.status(500).send(`Something went wrong: ${error}`)
            console.log(error);
        }
    }
)

router.route('/').get(
    async(req, res) => {
        try {
            const response = await Employee.find()
            res.json(response)
        } catch (error) {
            res.status(500).send(`Error adding employee: ${error.message}`);
        }
    }
)

router.route('/:id').get(
    async(req, res) => {
        try {
            const employee = await Employee.findById(req.params.id)
            if(!employee) {
                return res.status(404).send('Employee not found');
            }

            res.json(employee);
        } catch (error) {
            res.status(500).send(`Error updating employee: ${error.message}`);
        }
    }
)

router.route('/:id').put(
    async(req, res) => {
        try {
            const employee = await Employee.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true}
            )
            if(!employee) {
                return res.status(404).send('Employee not found');
            }

            res.send('Employee updated successfully');
        } catch (error) {
            res.status(500).send(`Error updating employee: ${error.message}`);
        }
    }
)

router.route('/:id').delete(
    async(req, res) => {
        try {
            const employee = await Employee.findByIdAndDelete(req.params.id)
            if(!employee) {
                return res.status(404).send('Employee not found');
            }

            res.send('Employee deleted');
        } catch (error) {
            res.status(500).send(`Error updating employee: ${error.message}`);
        }
    }
)

router.route('/:search').get(
    async(req, res) => {
        try {
            const employee = await Employee.find({"firstName": req.params.search})

            if(!employee) {
                return res.status(404).send('Employee not found');
            }

            res.json(employee);
        } catch (error) {
            res.status(500).send(`Error updating employee: ${error.message}`);
        }
    }
)



module.exports = router;