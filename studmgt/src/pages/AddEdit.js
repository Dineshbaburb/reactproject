import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdArrowBack } from "react-icons/md";


const initialState = {
    Firstname: "",
    Lastname: "",
    Location: "",
    email: "",
    DOB:"",
    Education: "",
    about:"",
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);

    const { Firstname, Lastname, Location, email, DOB, Education, about } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Firstname || !Lastname || !Location || !email || !DOB || !Education || !about) {
            toast.error("Please provide value into each input field");
        }
        else {
            axios.post(`http://localhost:5000/api/post`, {
                Firstname,
                Lastname,
                Location,
                email,
                DOB,
                Education,
                about
            }).then(() => {
                setState({ Firstname: "", Lastname: "", Location: "", email: "", DOB: "", Education: "", about: "" })
            }).catch((err) => toast.error(err.response.data));
            toast.success("Added Successfully!");
            setTimeout(() => navigate("/"), 500);
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState((prevalue) => {
            return {
                ...prevalue,
                [name]: value
            }
        })
    };

    return (

        <div className='container'>



            <div className='stud-details'>
                <div className='back-arrow'>
                    <Link to={"/"}>
                        <MdArrowBack />
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className='name'>
                        <div className='form-info'>
                            <label htmlFor='fname'>First Name : </label>
                            <input
                                type='text'
                                id='fname'
                                name='Firstname'
                                value={Firstname}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='form-info lname'>
                            <label htmlFor='lname'>Last Name : </label>
                            <input
                                type='text'
                                id='lname'
                                name='Lastname'
                                value={Lastname}
                                onChange={handleInputChange}
                            />
                        </div>

                    </div>

                    <div className='form-info'>
                        <label htmlFor='location'> Location : </label>
                        <input
                            type='text'
                            id='loc'
                            name='Location'
                            value={Location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-info'>
                        <label htmlFor='email'>Email: </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-info'>

                        <label htmlFor='DOB'>DOB : </label>
                        <div className='date-input'>
                            <input
                                type='date'
                                placeholder='dd/mm/yyyy'
                                id='DOB'
                                name='DOB'
                                value={DOB}
                                onChange={handleInputChange}
                            />

                            {/* <input
                                type='text'
                                maxLength="2"
                                placeholder='MM'
                                id='mm'
                                name='mm'
                                value={mm}
                                onChange={handleInputChange}
                            />

                            <input
                                type='text'
                                maxLength="4"
                                placeholder='YY'
                                id='yyyy'
                                name='yyyy'
                                value={yyyy}
                                onChange={handleInputChange}
                            /> */}

                        </div>
                    </div>

                    <div className='form-info'>
                        <label htmlFor='education'>Education : </label>
                        <input
                            type='text'
                            id='eduation'
                            name='Education'
                            value={Education}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='form-info'>
                    <label htmlFor='about'>About : </label>
                    <textarea
                        type='text'
                        id='about'
                        name='about'
                        value={about}
                        onChange={handleInputChange}
                    />
                    </div>
                    {/* <input type='submit' value='Submit' /> */}

                    <button className='btn btn-submit '>
                        submit
                    </button>

                </form>

            </div>

        </div>
    )

}

export default AddEdit;
