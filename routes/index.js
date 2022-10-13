var express = require('express');
var router = express.Router();
var todos = require('../resource/todo');
var Todos = require('../models/Todos');
// console.log(todos);

/* GET home page. */

router.get('/', async function(req, res, next) {
    const todos = await Todos.find();
    console.log(todos);
    res.render('home', { todosList: todos });
});

router.get('/home', function(req, res, next) {
    res.render('home');
});

router.get('/add-to-do', function(req, res, next) {
    res.render('addTodo', { title: 'Add To do' });
})

router.post('/save-to-do', async function(req, res, next) {
    const todo = new Todos({
        title: req.body.title,
        description: req.body.description
    });
    await todo.save();
    // todo.save().then() => console.log('todo inserted')).catch() => console.log('error');

    // await Todos.insertMany({ title: req.body.title, description: req.body.description });
    // todos.push({...req.body, _id: `00${todos.length}` });
    res.redirect('/');
})

// router.get('/delete-to-do/:index', function(req, res, next) {
//     todos.splice(req.params.index, 1);
//     res.redirect('/');
// })
router.get('/delete-to-do/:id', async function(req, res, next) {
    // const index = todos.findIndex(todo => todo._id === req.params.id);
    // todos.splice(index, 1);
    const del = await Todos.remove({ _id: req.params.id });
    res.redirect('/');
})

router.get('/open-update-form/:id', async function(req, res, next) {
    // const todotodo = todos.find(todo => todo._id === req.params.id);
    const todo = await Todos.findOne({ _id: req.params.id });
    res.render('editToDo', { title: 'Edit-to-do', todo: todo });
})
router.post('/update-to-do/:id', async function(req, res, next) {
    // const index = todos.findIndex(todo => todo._id === req.params.id);
    // todos.splice(index, 1, {...req.body, _id: req.params.id });
    // const update = await Todos.updateMany({}, { title: req.body.title, description: req.body.description });
    const update = await Todos.updateOne({ _id: req.params.id }, { $set: { title: req.body.title, description: req.body.description } });
    res.redirect('/');
})

module.exports = router;