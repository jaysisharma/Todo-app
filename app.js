const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.post('/add', (req, res) => {
  const { todo } = req.body;
  todos.push({ text: todo, completed: false });
  res.redirect('/');
});

app.get('/update/:index', (req, res) => {
  const { index } = req.params;
  res.render('update', { index, todo: todos[index].text });
});

app.post('/update/:index', (req, res) => {
  const { index } = req.params;
  const { todo } = req.body;
  todos[index].text = todo;
  res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
  const { index } = req.params;
  todos.splice(index, 1);
  res.redirect('/');
});

app.get('/complete/:index', (req, res) => {
  const { index } = req.params;
  todos[index].completed = true;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
