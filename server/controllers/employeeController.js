const Employee = require("../models/Employee");

//create an employee record
const createEmployee = async (req, res) => {
    try {
        let newEmployee = new Employee(req.body);

        let employee = await Employee.findOne({email: req.body.email})

        if(employee) {
            return res.status(401).json({
                "message": "Employee Already Exist"
            })
        }

        employee = new Employee(newEmployee);
        
        await employee.save();
        res.status(201).json({
            "result": "Employee created successfully",
            employee
        });
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong: ${error}`
        })
        console.log(error);
    }
}

//get all the employees record
const getAllEmployees = async (req, res) => {
    try {
        const response = await Employee.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            message: `Error loading employee: ${error.message}`
        })
    }
}

//get employee records using employee id
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if(!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).send(`Error updating employee: ${error.message}`);
    }
}

//update employee record
const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true}
        )

        if(!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating employee: ${error.message}`
        });
    }
}

//delete employee record
const deleteEmployee = async(req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)

        if(!employee) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: `Error updating employee: ${error.message}`
        });
    }
}

//search employee records
const searchEmployee = async (req, res) => {
    try {
        const employee = await Employee.find({"firstname": req.params.search})

        if(!employee) {
            return res.status(404).send('Employee not found');
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).send(`Error updating employee: ${error.message}`);
    }
}

module.exports = { 
    createEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee,
    searchEmployee
}