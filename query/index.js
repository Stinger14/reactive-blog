const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// example of a post object
// posts === {
//     'y373j49': {
//         id: 'y373j49',
//         title: 'post title',
//         comments: [
//             { id: 'j4k3j4', content: 'comment!' }
//         ]
//     }
// }

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    console.log(posts);
    console.log(data);
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
});
