var express = require('express');
var router = express.Router();
var todos = require('../resource/todo');
// console.log(todos);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { todosList: todos });
});

router.get('/home', function(req, res, next) {
    res.render('home');
});

router.get('/add-to-do', function(req, res, next) {
    res.render('addTodo', { title: 'Add To do' });
})

router.post('/save-to-do', function(req, res, next) {
    todos.push({...req.body, _id: `00${todos.length}` });
    res.redirect('/');
})

router.get('/delete-to-do/:index', function(req, res, next) {
    todos.splice(req.params.index, 1);
    res.redirect('/');
})

router.get('/open-update-form/:id', function(req, res, next) {
    const todotodo = todos.find(todo => todo._id === req.params.id);
    res.render('editToDo', { todo: todotodo });
})
router.post('/update-to-do/:id', function(req, res, next) {
    const index = todos.findIndex(todo => todo._id === req.params.id);
    todos.splice(index, 1, {...req.body, _id: req.params.id });
    res.redirect('/');
})

module.exports = router;