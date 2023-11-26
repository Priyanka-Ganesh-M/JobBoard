import React, { useState } from 'react';
import DesktopNav from '../Components/DesktopNavbar';
import './Home.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Home()
{
  const {id} = useParams();
  console.log(id);
    return(
    <div className = "home-page">
      <div className = "nav-bar">
        <DesktopNav home_url ={`/${id}`} url2 = {`/job-listing/${id}`} logIn = '/'  Home = 'Home' Title2 = 'Find Jobs' />
      </div>
      <div className = "content">
            <h2 className = "caption">Find Your Dream Job</h2>
            <img className = "job-img" src = {process.env.PUBLIC_URL + '/images/job.jpg'} alt = "job interview"></img>
            
        </div>
    </div>
    )
}

export default Home;