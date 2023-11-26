import {React,useState} from 'react';
import DesktopNav from '../Components/DesktopNavbar';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'

function EmployerLogIn()
{
    const id = ''
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
        await axios.post('http://localhost:4000/employer/log-in',{username : username, password : password},{headers: {'Content-Type': 'application/json'}}).then((response)=>{
        
        if(response.data.user.id !== null) 
        {
            const id = response.data.user.id;
            console.log(id)
            window.location.href = `/employers/${id}`;
        }
      })
    }
        catch(err)
        {
            setUsername('');
            setPassword('');
            showToast()
        console.log('login failed');
        }
    }
    return(
        <div className="container mt-5">
        {/* <DesktopNav home_url = {`/employers/${id}`} url2 ={`/employer/applications/${id}`} logIn = '/employer/log-in' url3 = '/' Home = 'Home' Title2 = 'Search Applications' Title3 = 'Search Job'/> */}
        
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
                <p style = {{paddingLeft : '8px'}}>Don't have an account? <a href = '/employer/register'>Register</a></p>
            </div>
            </div>
            
            </div>
)
}

export default EmployerLogIn;