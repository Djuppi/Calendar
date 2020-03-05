import React, { useState } from 'react'
import { createNewUser } from '../services/sessions';

export default function Signup(props) {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        color: ''
    })
    const { name, email, password, color } = newUser

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createNewUser({name, email, password, color});
        setNewUser({
            name: '',
            email: '',
            password: '',
            color: ''
        })
        const { history } = props;
        history.replace('/')
    }
    return (
        <div>
            <form>
                <label>
                    Name:
                    <input 
                        type="text" 
                        placeholder="Enter full name"
                        value={name}
                        onChange={(event) => setNewUser({...newUser, name: event.target.value})}
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        placeholder="Enter email-address" 
                        value={email}
                        onChange={(event) => setNewUser({...newUser, email: event.target.value})}
                        required 
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="text" 
                        placeholder="Enter wanted password" 
                        value={password}
                        onChange={(event) => setNewUser({...newUser, password: event.target.value})}
                        required 
                    />
                </label>
                <select value={color} onChange={(event) => setNewUser({...newUser, color: event.target.value})} required>
                    <option id="Pale-Green" value="#98FB98">Pale Green</option>
                    <option id="Light-Coral" value="#F08080">Light Coral</option>
                    <option id="Khaki" value="#F0E68C">Khaki</option>
                    <option id="Sandy-Brown" value="#F4A460">Sandy Brown</option>
                </select>
                <button
                    onClick={(event) => handleSubmit(event)}
                    >Signup</button>
            </form>
        </div>
    )
}
