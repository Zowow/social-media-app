import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import {useLogin} from '../hooks/useLogin'

const Login = () => {
    const {login, error, isLoading} = useLogin();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(inputs.username, inputs.password)
    }

    return (
        <div className='relative'>
            <Link to="/signup" className="absolute top-8 right-8 w-20 p-2 bg-slate-400 rounded-md font-bold text-center text-white">Sign up</Link>
            <div className='login-container h-screen flex flex-col items-center justify-center'>
                <img src="https://cdn-icons-png.flaticon.com/512/8443/8443294.png" alt="logo" className="w-16"/>
                <form className='flex flex-col gap-4 w-[350px]' 
                onSubmit={handleSubmit}>
                    <h1 className='text-center text-[32px]'>Login your account</h1>
                    <p className='text-center'>Enter your details below to login</p>

                    <input 
                        className='rounded-md px-4 py-2'
                        type="text"
                        value={inputs.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Username"
                    />
                    <input 
                        className='rounded-md px-4 py-2'
                        type="password"
                        value={inputs.password}
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
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

export default Login
