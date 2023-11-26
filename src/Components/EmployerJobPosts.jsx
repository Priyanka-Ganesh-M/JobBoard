import React from 'react';
import Post from './Post';

function EmployerJobPosts(props) {
    return (
        props.posts.map((post) => {
            return (
                <Post
                    key={post._id}
                    company={post.company}
                    jobPos={post.position}
                    jobLoc={post.location}
                    skillSet={post.skillSet}
                    url={`/employer/${post._id}/applications/${props.empId}`}
                />
            )
        })
    );
}
export default EmployerJobPosts;