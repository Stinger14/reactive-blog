import React from "react";

export default ({ comments }) => {

    // iterate over comments and render list of comments
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    });
    // display list of comments
    return <ul>
        {renderedComments}
        </ul>;
};

