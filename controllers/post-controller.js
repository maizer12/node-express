const Post = require('../models/post');
const createPath = require('../helpers/createPath.js');

const getPosts = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then(posts => res.render(createPath('posts'), { title: 'posts', dataPosts: posts }))
		.catch(err => console.log(err));
};

const getPost = (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.render(createPath('post'), { title: 'post', post }))
		.catch(err => console.log(err));
};

const deletePost = (req, res) => {
	console.log(req.params.id);
	Post.findByIdAndDelete(req.params.id)
		.then(post => res.send('is ok!'))
		.catch(err => console.log(err));
};

const createPost = (req, res) => {
	const post = new Post(req.body);
	post
		.save()
		.then(result => res.redirect('/posts'))
		.catch(err => res.status(404).render(createPath('404'), { title: 'Error Page' }));
};

const editPost = (req, res) => {
	const { title, author, text } = req.body;
	const { id } = req.params;
	Post.findByIdAndUpdate(id, { title, author, text })
		.then(data => res.redirect(`/posts`))
		.catch(err => console.log(err));
};

module.exports = {
	getPost,
	getPosts,
	deletePost,
	createPost,
	editPost,
};
