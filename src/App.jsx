import {React, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './ApplicantsDashboard/Home';
import JobListing from './ApplicantsDashboard/JobListing';
import AppSignUp from './ApplicantsDashboard/ApplicantSignUp';
import AppRegister from './ApplicantsDashboard/AppRegister';
import EHome from './EmployerDashboard/EHome';
import JobDetail from './ApplicantsDashboard/JobDetail';
import DisplayApplications from './EmployerDashboard/DisplayApplications';
import EmployerLogIn from './EmployerDashboard/EmployerLogIn';
import EmpReg from './EmployerDashboard/EmployerReg';
import DisplayPosts from './EmployerDashboard/DisplayPosts';

function App(){


return (
   <Router>
    <Routes>
        <Route exact path='/' element={<AppSignUp />} />
        <Route path = '/:id' element={<Home/>}/>
        <Route path='/job-listing/:id' element = {<JobListing/> } />
        <Route path = '/log-in' element = {<AppSignUp />} />
        <Route path = '/register' element = {<AppRegister /> }/>

        <Route path = '/employers/:id' element = {<EHome/>} />
        <Route path = '/jobDetails/:postid/:userid' element = {<JobDetail/>}/>
        <Route path = '/employer/jobposts/:id' element = {<DisplayPosts/>}/>
        <Route path = '/employer/log-in' element = {<EmployerLogIn/>}/>
        <Route path = '/employer/register' element = {<EmpReg/>}/>
        <Route path = '/employer/:postid/applications/:id' element = {<DisplayApplications/>}/>
     </Routes>
  </Router>
    );
}

export default App;