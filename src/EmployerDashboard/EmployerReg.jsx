import {React, useState} from 'react';
import axios from 'axios';
function EmpReg()
{
    const id = ''
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e)
    {
        e.preventDefault();
        await axios.post('http://localhost:4000/employer/register',{username : username, password : password},{headers: {'Content-Type': 'application/json'}}).then((response)=>{
        
        if(response.data.user.id !== null) 
        {
            const id = response.data.user.id;
            console.log(id);
            window.location.href = `/employers/${id}`;
        }

        else
        {
        console.log('login failed');
        }
    }
)}
    return(
        <div>
        
        <div className="container mt-5">
        
        <h1>Register</h1>

        <div className="row">
            <div className="col-sm-8">
                <div className="card-body">

                <form>
                    <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="username" onChange = {(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div><br></br>
                    <button type="submit" className="btn" style = {{backgroundColor : '#0d6efdd1'}} onClick={handleSubmit}>Register</button>
                </form>
                <p style = {{paddingLeft : '8px'}}>Don't have an account? <a href = '/'>Log In</a></p>
                </div>
            </div>
            </div>
            </div>
            </div>
            
)
}

export default EmpReg;