const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://vanyakuratov70:6nRZvIXRvxD47CCN@cluster0.uhqqhon.mongodb.net/node-blog';

mongoose
	.connect(db)
	.then(res => console.log('Connect is successes '))
	.catch(err => console.log(err));

const createPath = page => path.resolve(__dirname, 'views', `${page}.ejs`);

app.listen(PORT, 'localhost', err => {
	console.log('listen ' + PORT);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(express.urlencoded({ extends: false }));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
	res.render(createPath('index'), { title: 'Home' });
});

app.get('/contacts', (req, res) => {
	const contacts = [
		{ name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
		{ name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
		{ name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
	];
	res.render(createPath('contact'), { contacts, title: 'Contacts' });
});

app.get('/about-us', (req, res) => {
	res.redirect('/contacts');
});

app.get('/post/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.render(createPath('post'), { title: 'post', post }))
		.catch(err => console.log(err));
});

app.get('/posts', (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then(posts => res.render(createPath('posts'), { title: 'posts', dataPosts: posts }))
		.catch(err => console.log(err));
});

app.delete('/posts/:id', (req, res) => {
	console.log(req.params.id);
	Post.findByIdAndDelete(req.params.id)
		.then(post => res.send('is ok!'))
		.catch(err => console.log(err));
});

app.get('/add-post', (req, res) => {
	res.render(createPath('add-post'), { title: 'Create Post' });
});

app.post('/add-post', (req, res) => {
	const post = new Post(req.body);
	post
		.save()
		.then(result => res.redirect('/posts'))
		.catch(err => console.log(err));
});

app.get('/edit/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.render(createPath('edit-post'), { title: 'Edit Post', post }))
		.catch(err => console.log(err));
});

app.put('/edit/:id', (req, res) => {
	const { title, author, text } = req.body;
	const { id } = req.params;
	Post.findByIdAndUpdate(id, { title, author, text })
		.then(data => res.redirect(`/posts`))
		.catch(err => console.log(err));
});

app.use((req, res) => {
	res.status(404).render(createPath('404'));
});
