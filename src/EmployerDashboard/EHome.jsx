import {React, useState, useEffect} from 'react';
import GroupJobPostings from '../Components/GroupJobPosting';
import DesktopNav from '../Components/DesktopNavbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import {toast, ToastContainer} from 'react-toastify'
import './eHome.css';
function EHome()
{
    const [formData, setFormData] = useState({
        company: "",
        role: "",
        email : "",
        location : "",
        skillSet : ""
      });
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/employers/${id}`).then((response)=>setPosts(response.data));
      },[]);

      const showToast = () => {
        toast('Job Posted', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      };
      
       function handleChange(e)
        {
            e.preventDefault();
            const { name, value } = e.target;

            setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            }));
        };

        async function onSubmit(e)
        {
            e.preventDefault();
            await axios.post(`http://localhost:4000/employers/${id}`, {jobDetails : formData}).then((response)=>console.log(response.data));
            setFormData({
            company : "",
            role: "",
            email : "",
            location : "",
            skillSet : ""
            });
            showToast()
        }
    return (
        <div>
        <DesktopNav home_url = {`/employers/${id}`} url2 ={`/employer/jobposts/${id}`} logIn = '/' url3 = '/' Home = 'Home' Title2 = 'Search Applications' Title3 = 'Search Job'/>
        <div className='container' style = {{marginTop:'4%'}}>

        <InputGroup className="mb-3">
        <InputGroup.Text>Company</InputGroup.Text>
        <Form.Control
        name = "company"
        onChange = {handleChange}
        />
        </InputGroup>

        <InputGroup className="mb-3">
        <InputGroup.Text>Role</InputGroup.Text>
        <Form.Control
        name = "role"
        onChange = {handleChange}
        />
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroup.Text>Email</InputGroup.Text>
        <Form.Control
        name = "email"
        onChange = {handleChange}
        />
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroup.Text>Location</InputGroup.Text>
        <Form.Control
        name = "location"
        onChange = {handleChange}
        />
        </InputGroup>
        
        <InputGroup className='mb-3'>
        <InputGroup.Text>Skills Required</InputGroup.Text>
        <Form.Control
        name = "skillSet"
        onChange = {handleChange}
        />
        </InputGroup>
        <Button onClick={onSubmit}>Post a Job</Button>
        </div>
        <GroupJobPostings posts={posts} />
        <ToastContainer />
        </div>
    )
}

export default EHome;