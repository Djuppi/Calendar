import React, {useState} from 'react'
import { login } from '../services/sessions';

export default function Login(props) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleLoginAttempt = async (event) => {
        event.preventDefault();
        await login({email, password})
        const { token } = await login({email, password})
        localStorage.setItem('Calendar-token', token)
        props.history.push('/')
    }
    
    return (
        <div>
            <form>
                <label>
                    Email:
                    <input 
                        type="text" 
                        value={email}
                        onChange={(event) => setemail(event.target.value)}
                        required/>
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        value={password}
                        onChange={(event) => setpassword(event.target.value)}
                        required/>
                </label>
                <button
                    onClick={(event) => handleLoginAttempt(event)}
                    >Login</button>
            </form>
        </div>
    )
}
