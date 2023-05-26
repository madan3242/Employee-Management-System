import React, { useState } from 'react'
import { axiosPut } from '../../services/axiosServices'
import { GrClose } from 'react-icons/gr'

const EditDetailsModal = ({ empById, setEditModal }) => {
    const { firstname, lastname, email, phone, job, dateofjoining, image } = empById;

    const [loading, setLoading] = useState(false);

    const [employee, setEmployee] = useState({
        firstname: firstname, 
        lastname: lastname, 
        image: image, 
        email: email, 
        phone: phone, 
        job: job, 
        dateofjoining: dateofjoining
    })

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    const imageChange = (e) => {
        let imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener('load', () => {
            if (reader.result) {
                setEmployee({
                    ...employee,
                    image: reader.result
                })
            } else {
                console.log("Error");
            }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true)
        try {
            const response = await axiosPut(`/employee/${empById._id}`, employee);
            setLoading(false)
            setEditModal(false)
            console.log(response);
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    
  return (
    <div className="modalContainer">
        <form action="" onSubmit={submitHandler}>
            <div className="modalBox">
                <div className="modalHeader">
                    <h2>Edit Employee Details</h2>
                    <GrClose size={20} className='close' onClick={() => setEditModal(false)}/>
                </div>
                <div className="modalInner">
                    <div className="input-container">
                        <div className="input-box">
                            <label htmlFor="">First Name</label>
                            <input 
                                type="text" 
                                name="firstname"
                                required 
                                onChange={handleChange}
                                value={employee.firstname}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="">Last Name</label>
                            <input 
                                type="text" 
                                name="lastname"
                                required 
                                onChange={handleChange}
                                value={employee.lastname}
                            />
                        </div>
                    </div>
                        <div className="input-box">
                            <label htmlFor="">Image</label>
                            <input 
                                type="file" 
                                name="image"
                                onChange={imageChange}
                                // value={employee.image}
                            />
                        </div>
                    <div className="input-container">
                        <div className="input-box">
                            <label htmlFor="">Email Address</label>
                            <input 
                                type="email" 
                                name="email"
                                required 
                                onChange={handleChange}
                                value={employee.email}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="">Phone</label>
                            <input 
                                type="text" 
                                name="phone"
                                required 
                                onChange={handleChange}
                                value={employee.phone}
                            />
                        </div>

                    </div>
                    <div className="input-box">
                        <label htmlFor="">Job-position</label>
                        <input 
                            type="text" 
                            name="job"
                            required 
                            onChange={handleChange}
                            value={employee.job}
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">Date of joining</label>
                        <input 
                            type="date" 
                            name="dateofjoining"
                            required 
                            onChange={handleChange}
                            value={employee.dateofjoining}
                        />
                    </div>
                    <div className="modalFooter">
                        <button className="add-btn">{loading ? 'Editing...' : 'Edit and Save'}</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditDetailsModal