import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const {signup, error, isLoading} = useSignup();

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })


    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs)
    }

    return (
        <div className='relative'>
        <Link to="/login" className="absolute top-8 right-8 w-20 p-2 bg-slate-400 rounded-md font-bold text-center text-white">Login</Link>
        <div className='signup-container h-screen flex flex-col items-center justify-center'>
            <img src="https://cdn-icons-png.flaticon.com/512/8443/8443294.png" alt="logo" className="w-16"/>
            <form className='flex flex-col gap-4 w-[350px]' 
            onSubmit={handleSubmit}>
                <h1 className='text-center text-[32px]'>Create an Account</h1>
                <p className='text-center'>Enter your details below to create an account</p>
                <input 
                    className='rounded-md px-4 py-2'
                    type="text"
                    value={inputs.firstName}
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter First Name"
                />
                <input 
                    className='rounded-md px-4 py-2'
                    type="text"
                    value={inputs.lastName}
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                />
                <input 
                    className='rounded-md px-4 py-2'
                    type="text"
                    value={inputs.username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter Username"
                />
                <input 
                    className='rounded-md px-4 py-2'
                    type="email"
                    value={inputs.email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email"
                />
                <input 
                    className='rounded-md px-4 py-2'
                    type="password"
                    value={inputs.password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter Password"
                />
                <input 
                    className='rounded-md px-4 py-2'
                    type="password"
                    value={inputs.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <input 
                    className='bg-slate-600 rounded-md py-2 text-white cursor-pointer'
                    type="submit" 
                />
            </form>
        </div>
        </div>
    )
}

export default Signup
