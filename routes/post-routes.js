const express = require('express');
const { getPost, getPosts, deletePost, createPost, editPost } = require('../controllers/post-controller.js');

const route = express.Router();

route.get('/posts', getPosts);

route.get('/post/:id', getPost);

route.delete('/posts/:id', deletePost);

route.post('/add-post', createPost);

route.put('/edit/:id', editPost);

module.exports = route;
