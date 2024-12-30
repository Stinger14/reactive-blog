const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// obj to store all posts that get created
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

// create new post
app.post('/posts', async (req, res) => {
    // generate a random id for the post
    const id = randomBytes(4).toString('hex');
    // get the title from the body of the request
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    // send event to the event bus
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch(err => {
        console.log(err.message);
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});

