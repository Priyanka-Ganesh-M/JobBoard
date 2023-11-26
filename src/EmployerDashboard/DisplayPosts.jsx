import React, { useState } from 'react';
import DesktopNav from '../Components/DesktopNavbar';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EmployerJobPosts from '../Components/EmployerJobPosts';
import './style.css'
function DisplayPosts()
{
    const [jobposts, setPosts] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:4000/employer/posts/${id}`).then((response)=>setPosts(response.data));//eslint-disable-next-line 
      },[]);
return(
<div>  
<DesktopNav home_url = {`/employers/${id}`} url2 ={`/employer/jobposts/${id}`} logIn = '/employer/log-in' url3 = '/' Home = 'Home' Title2 = 'Search Applications' Title3 = 'Search Job'/>
<div className = 'posts'><EmployerJobPosts posts = {jobposts} empId = {id} /></div>
</div>  
);
}

export default DisplayPosts;
