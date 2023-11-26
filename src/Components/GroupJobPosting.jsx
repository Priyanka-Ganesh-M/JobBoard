import React from 'react';
import JobPost from "./JobPostings";

function GroupJobPostings(props) {
    return (
        props.posts.map((post) => {
            return (
                <JobPost
                    key={post._id}
                    company={post.company}
                    jobPos={post.position}
                    jobLoc={post.location}
                    skillSet={post.skillSet}
                    url={`/jobDetails/${post._id}/${props.userId}`}
                />
            )
        })
    );
}
export default GroupJobPostings;