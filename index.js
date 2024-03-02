const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes.js');
const apiPostRoutes = require('./routes/api-post-routes.js');
const createPath = require('./helpers/createPath.js');
const Post = require('./models/post');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://vanyakuratov70:6nRZvIXRvxD47CCN@cluster0.uhqqhon.mongodb.net/node-blog';

mongoose
	.connect(db)
	.then(res => console.log('Connect is successes '))
	.catch(err => console.log(err));

app.listen(PORT, 'localhost', err => {
	console.log('listen ' + PORT);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(express.urlencoded({ extends: false }));

app.use(methodOverride('_method'));

app.use(postRoutes);

app.use(apiPostRoutes);

app.get('/', (req, res) => {
	res.render(createPath('index'), { title: 'Home' });
});

app.get('/add-post', (req, res) => {
	res.render(createPath('add-post'), { title: 'Create Post' });
});

app.get('/edit/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.render(createPath('edit-post'), { title: 'Edit Post', post }))
		.catch(err => console.log(err));
});

app.get('/contacts', (req, res) => {
	const contacts = [
		{ name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
		{ name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
		{ name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
	];
	res.render(createPath('contact'), { contacts, title: 'Contacts' });
});

app.use((req, res) => {
	res.status(404).render(createPath('404'));
});
