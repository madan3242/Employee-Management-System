import React, { useEffect, useState } from 'react'
import { axiosGet } from '../../services/axiosServices'
import './LeftNav.css'

const LeftNav = ({employeeId}) => {
    const [empById, setEmpById] = useState([])

    const getEmployeeById =async () => {
        try {
            const response = await axiosGet(`/employee/${employeeId}`)
            setEmpById(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEmployeeById()
    }, [employeeId])
  return (
    <nav className="leftNav">
        <div className="employeeDetail">
            <h2>Full Detail</h2>
            <img src={empById?.image} alt="" />
            <h1>{empById?.firstname} {empById?.lastname}</h1>
            <p>{empById?.email}</p>
            <p>{empById?.phone}</p>
            <p>{empById?.job}</p>
            <p className="date">{empById.dateofjoining}</p>
        </div>
    </nav>
  )
}

export default LeftNav