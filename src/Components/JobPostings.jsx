import React from 'react';
import Card from 'react-bootstrap/Card';
import './groupPosting.css';
function JobPost(props) {
  return (
    <span>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Company: {props.company}</Card.Title><br/>
        <Card.Subtitle className="mb-2 text-muted">Job Position: {props.jobPos}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Location: {props.jobLoc}</Card.Subtitle>
        <Card.Text>
        SkillSet required:{'  '} {props.skillSet}
        </Card.Text>
        {props.url?<a href = {props.url} style = {{textDecoration : 'none', color : 'black'}}>Apply</a>:<div></div>}
      </Card.Body>
    </Card>
    </span>
  );
}

export default JobPost;