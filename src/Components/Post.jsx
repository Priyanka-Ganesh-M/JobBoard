import React from 'react';
import Card from 'react-bootstrap/Card';
import './groupPosting.css';
function Post(props) {
  return (
    <span>
    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title>{props.company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.jobPos}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{props.jobLoc}</Card.Subtitle>
        <Card.Text>
        SkillSet required:{'  '} {props.skillSet}
        </Card.Text>
        {props.url?<a href = {props.url}>Show Applications</a>:<div></div>}
      </Card.Body>
    </Card>
    </span>
  );
}

export default Post;