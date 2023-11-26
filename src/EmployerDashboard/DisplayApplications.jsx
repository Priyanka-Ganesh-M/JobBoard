import React, { useState } from 'react';
import DesktopNav from '../Components/DesktopNavbar';
import Applications from './Applications';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css'
function DisplayApplications()
{
    const [applications, setApplications] = useState([]);
    const {postid, id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:4000/employer/${postid}/applications/${id}`).then((response)=>setApplications(response.data));
      },[]);
return(
<div>  
<DesktopNav home_url = {`/employers/${id}`} url2 ={`/employer/applications/${id}`} logIn = '/employer/log-in' url3 = '/' Home = 'Home' Title2 = 'Search Applications' Title3 = 'Search Job'/>
<div className='posts'><Applications applications = {applications} /></div>
</div>  
);
}

export default DisplayApplications;
