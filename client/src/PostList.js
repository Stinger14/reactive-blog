import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    // define a state variable posts and initialize it as an empty object
    const [posts, setPosts] = useState({});

    // get all posts from the server
    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        // update the state variable posts
        setPosts(res.data); 
    };

    // call fetchPosts when the component is first rendered
    useEffect(() => {
        fetchPosts();
    }, []);     // empty array tells react to only run this function once

    // render all posts
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
            className='card' 
            style={{width: '30%', marginBottom: '20px'}} 
            key={post.id}
            >
            <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
    );
    });
    
    // display redenderedPosts
    return <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
    </div>;
};
