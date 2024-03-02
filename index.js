const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = page => path.resolve(__dirname, 'views', `${page}.ejs`);

app.listen(PORT, 'localhost', err => {
	console.log('listen ' + PORT);
});

app.use(express.static('styles'));

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
app.get('/posts/:id', (req, res) => {
	res.redirect('/contact');
});
app.get('/posts', (req, res) => {
	res.render(createPath('posts'));
});
app.get('/add-post', (req, res) => {
	res.render(createPath('add-post'));
});
app.use((req, res) => {
	res.status(404).render(createPath('404'));
});
