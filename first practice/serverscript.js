// you can use the http module to create a server or better yet use back end frameworks for this purpose.
//use npm to install express package. npm install express

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(express.urlencoded({extended: false}))
app.use(express.json());

//app.use(express.static(__dirname + '/public')) 
//name a file public and put an index.html in it and see that it will be displayed
// but first static

app.get('/',(req, res) => {
	res.send('getting root')
});

app.get('/profile',(req, res) => {
	res.send('getting profile')
});

app.get('/profileinfo',(req, res) => {
	 //
	const user = {
		name: 'Sally',
		hobby: 'Soccer'
	}
	res.send(user);
});


app.post('/profile',(req, res) => {
	console.log(req.body)
	console.log(req.headers)
	// also req.query, headers, params
	const user = {
		name: 'Sally',
		hobby: 'Soccer'
	}
	res.send('success');
});

app.listen(3000);

//app.use((req, res, next) => {
	//console.log(work)
	//next();
//});