import React, { useState, useEffect} from "react";
import axios from "axios";

export default ({ postId }) => {
    // fetch data
    const [comments, setComments] = useState([]);
    // set state
    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    // map over that state
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    });
    // display list of comments
    return <ul>
        {renderedComments}
    </ul>;
};

