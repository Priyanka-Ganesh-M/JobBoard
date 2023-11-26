import React, { useState } from 'react';
import DesktopNav from '../Components/DesktopNavbar';
import Button from 'react-bootstrap/Button';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import GroupJobPostings from '../Components/GroupJobPosting';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify'
function JobListing() {
  const {id} = useParams();
  const [jobPosts, setjobPosts] = useState([]);
  const [formData, setFormData] = useState({
    job_position: "",
    job_location: "",
  });
  const showToast = () => {
    toast('Oops.. no jobs found. Drag to right to clear the message', {
      position: 'top-right',
      autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function searchJob(e) {
    const jobPosition = formData.job_position;
    const jobLocation = formData.job_location;
    await axios.get(`http://localhost:4000/posts/${jobPosition}&${jobLocation}`).then((response) => {
    setFormData({
     job_position: "",
     job_location: "",
    });
    console.log(response.data)
    if(response.data.length === 0)
    {showToast()}

    else
    setjobPosts(response.data)});
  }

  return (
    <div className="jobListing">
      <DesktopNav home_url='/' url2='/job-listing' logIn = '/log-in' url3='/employer/log-in' Home='Home' Title2='Find Jobs' Title3='Employer?' /><br /><br />
      <div className='container'>
        <form>
          <InputGroup className="mb-3">
            <Form.Control
              type="text" className="form-control" placeholder="Job Location" name="job_location" onChange={handleChange} />
            <Form.Control
              type="text" className="form-control" placeholder="Job Position" name="job_position" onChange={handleChange} />
            <Button onClick={searchJob}>
              <SearchIcon />
            </Button>
          </InputGroup>
        </form>
        <ToastContainer />
      <GroupJobPostings posts={jobPosts} userId = {id}/>
      

      </div>
    </div>
  )
}
export default JobListing;