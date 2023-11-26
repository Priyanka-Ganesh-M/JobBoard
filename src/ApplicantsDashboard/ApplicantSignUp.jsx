import React from 'react';
import DesktopNav from '../Components/DesktopNavbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignUp from '../Components/SignUp';
import EmployerLogIn from '../EmployerDashboard/EmployerLogIn';
function AppSignUp()
{
    return(
        <div>
        
        <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title="User">
          <SignUp/>
        </Tab>
        <Tab eventKey="profile" title="Employer">
          <EmployerLogIn/>
        </Tab>
        
        
      </Tabs>  
      </div>
    )
}

export default AppSignUp;