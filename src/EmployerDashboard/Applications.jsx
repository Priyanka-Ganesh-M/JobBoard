import {React, useState} from 'react';
import Application from './SingleApplication';

function Applications(props) {
    return(
        props.applications.map((application) => {
        const url = `http://localhost:4000/files/${application.resume}`
        return (
        <Application key={application._id} firstName={application.firstName} lastName={application.lastName} email={application.email}
         url = {url} />
        )}
    )
    )
}

export default Applications;