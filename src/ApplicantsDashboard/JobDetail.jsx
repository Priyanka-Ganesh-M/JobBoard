import React, { useState , useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './jobDetail.css';
import JobPost from '../Components/JobPostings';
import Button from 'react-bootstrap/Button';
import DesktopNav from '../Components/DesktopNavbar';
function JobDetail()
{
  const [post, setPost] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email : "",
    file : null
  });
  const {postid, userid}= useParams();
  useEffect(() => {
    axios.get(`http://localhost:4000/jobDetails/${postid}`).then((response)=>setPost(response.data));//eslint-disable-next-line 
    if(userid !== null)setAuthenticated(true)
  },[]);
  
  
  function handleChange(e)
  {
    e.preventDefault();
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input separately
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Assuming you want to store the first selected file
      }));
    } else {
      // Handle other form fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };


  
 const url = `http://localhost:4000/jobDetails/${postid}`;
  // async function onSubmit(e)
  // {
  //   e.preventDefault();
  //   console.log(formData.file);
  //   await axios.post(`http://localhost:4000/jobDetails/${id}`, {appDetails : formData}).then((response)=>console.log(response.data));
  
  // }
return(
  <div>
  <DesktopNav home_url = {`/${userid}`} url2 = '/job-listing' logIn = '/' Home = 'Home' Title2 = 'Find Jobs' Title3 = 'Employer?'/>
<div className='application-form'>
<JobPost company = {post.company} jobPos = {post.position} jobLoc = {post.location} skillSet = {post.skillSet} />
{authenticated?
<form action={url} enctype="multipart/form-data" method="post">
<InputGroup className="mb-3">
<InputGroup.Text>First Name</InputGroup.Text>
<Form.Control
name = "firstName"
onChange = {handleChange}
/>
</InputGroup>
<InputGroup className="mb-3">
<InputGroup.Text>Last Name</InputGroup.Text>
<Form.Control
name = "lastName"
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


<Form.Control className='mb-3'
  type="file"
  required
  name='resume'
onChange = {handleChange}
/><br/>
<Button className='mb-3' type = 'submit'>Apply</Button>
</form>:<a href = '/log-in'>Log in to access</a>}
</div>
</div>
)}

export default JobDetail;