const Post = require('../models/post.js');

const getPosts = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then(posts => res.json(posts))
		.catch(err => console.log(err));
};

const getPost = (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => console.log(err));
};

const deletePost = (req, res) => {
	Post.findByIdAndDelete(req.params.id)
		.then(post => res.json(post))
		.catch(err => console.log(err));
};

const createPost = (req, res) => {
	const post = new Post(req.body);
	post
		.save()
		.then(result => res.json(result))
		.catch(err => res.status(400).send(err));
};

const editPost = (req, res) => {
	const { title, author, text } = req.body;
	const { id } = req.params;
	Post.findByIdAndUpdate(id, { title, author, text })
		.then(data => res.json(data))
		.catch(err => console.log(err));
};

module.exports = {
	getPost,
	getPosts,
	deletePost,
	createPost,
	editPost,
};
