import React, { useState } from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
function SignUp()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const showToast = () => {
        toast('login failed, try again', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };

    async function handleSubmit(e)
    {
        e.preventDefault();
        try{
        await axios.post('http://localhost:4000/log-in',{username : username, password : password},{headers: {'Content-Type': 'application/json'}}).then((response)=>{
        setUsername('');
        setPassword('');
        if(response.data.user.id !== null) 
        {
            const id = response.data.user.id;
            window.location.href = `/${id}`;
        }
       });
     }

        catch(err)
        {
        showToast()
        setUsername('');
        setPassword('');
        console.log('login failed');
        }
    }
    return(
        <div className="container mt-5">
        <h1>Log In</h1>
        <ToastContainer />
        <div className="row">
            <div className="col-sm-8">
                <div className="card-body">

                <form>
                    <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name='username' id = 'username' onChange = {(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" name='password' id = 'password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div><br></br>
                    <button type="submit" className="btn" style = {{backgroundColor : '#0d6efdd1'}} onClick={handleSubmit}>Log In</button>
                </form>
            
                </div>
                <p style = {{paddingLeft : '8px'}}>Don't have an account? <a href = '/register'>Register</a></p>
            </div>
            </div>
            
            </div>
)
}

export default SignUp;