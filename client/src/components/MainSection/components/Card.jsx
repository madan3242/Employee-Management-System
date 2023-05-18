import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { axiosDelete } from '../../../services/axiosServices'

const Card = ({ empData, handleEdit, handleReRender}) => {
    const { firstname, lastname, job, email, image} = empData;
    const [dropDown, setDropDown] = useState(false);

    const handleDelete = async(id) => {
        try {
            const response = await axiosDelete(`/employee/${id}`)
            console.log(response);
            handleReRender()
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <>
        <div className="card-component">
            <div className="card-inner">
                <div className="dropdownContainer">
                    <BsThreeDotsVertical size={20} onClick={() => setDropDown(!dropDown)} />
                    {
                        dropDown && <ul className="dropdown"
                            onMouseLeave={() => setDropDown(false)}
                        >
                            <li onClick={()=>handleEdit(empData._id)}>Edit</li>
                            <li onClick={()=>handleDelete(empData._id)}>Delete</li>
                        </ul>
                    }
                </div>
                <div className="profileImage">
                    <img src={image} alt={firstname} />
                </div>
                <div className="emp-detail">
                    <h3>{firstname} {lastname}</h3>
                    <p>{email}</p>
                </div>
            </div>
            <div className="job-role">
                <p>{job}</p>
            </div>
        </div>
    </>
  )
}

export default Card