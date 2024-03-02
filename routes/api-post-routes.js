const express = require('express');
const { getPost, getPosts, deletePost, createPost, editPost } = require('../controllers/api-post-controller.js');

const route = express.Router();

route.get('/api/posts', getPosts);

route.get('/api/post/:id', getPost);

route.delete('/api/posts/:id', deletePost);

route.post('/api/add-post', createPost);

route.put('/api/edit/:id', editPost);

module.exports = route;
