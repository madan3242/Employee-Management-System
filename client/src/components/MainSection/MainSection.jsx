import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { axiosGet } from '../../services/axiosServices'
import Card from './components/Card';
import './MainSection.css'
import ModalPopup from '../ModalPopup/ModalPopup';
import EditDetailsModal from '../ModalPopup/EditDetailsModal';

const MainSection = ({setEmployeeId}) => {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [empById, setEmpById] = useState([]);
    const [reRender, setReRender] = useState(false);

    const getAllEmployee = async () => {
        try {
            const response = await axiosGet('/employee/');
            setEmployees(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getEmployeeById = async (id) => {
        try {
            const response = await axiosGet(`/employee/${id}`);
            setEmpById(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = async (e) => {
        try {
            if(e.target.value === ""){
                getAllEmployee();
            } else {
                const response = await axiosGet(`/employee/search/${e.target.value}`)
                setEmployees(response.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEdit = async (id) => {
        await getEmployeeById(id)

        setEditModal(true)
    }

    const handleReRender = () => {
        setReRender(true)
    }

    useEffect(() => {
        getAllEmployee();
    }, [showModal, editModal, reRender])

  return (
    <>
        { showModal && <ModalPopup setShowModal={setShowModal} /> }
        { editModal && <EditDetailsModal setEditModal={setEditModal} empById={empById} />}
        <main className="mainContainer">
            <div className="mainWrapper">
                <h1>
                    People <span className='emp-count'>{employees.length}</span>
                </h1>
                <div className="employeeHeader">
                    <div className="searchBox">
                        <input 
                            type="text"
                            placeholder="Search by name, email, designation etc" 
                            onChange={handleSearch}
                        />
                        <BiSearch size={20} />
                    </div>
                    <button className="add-btn" onClick={() => setShowModal(true)}>
                        <IoMdAdd size="20" color="#ffffff" />Add Employee
                    </button>
                </div>
                <div className="employees">
                {
                    employees && employees.map((emp) => {
                        return <div key={emp._id} onClick={() => setEmployeeId(emp._id)}>
                            <Card
                                empData={emp}
                                handleEdit={handleEdit}
                                handleReRender={handleReRender}
                            />
                        </div>
                    })
                }
                </div>
            </div>
        </main>
    </>
  )
}

export default MainSection