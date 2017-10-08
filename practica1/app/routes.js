var Todo = require('./models/todo');
function getTodos(res) {
    Todo.find(function (err, todos) { // si hay algun error, se manda a la consola
        if (err) {res.send(err);}
        res.json(todos); // regresa todps los pendientes en formato JSON
    });
};
module.exports = function (app) {
    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });
    // crear un pendiente
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) res.send(err);
            getTodos(res);  // se obtienen todos los pendientes despues de que creas uno 
        });
    });
    // borrar un pendiente
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);
            getTodos(res);
        });
    });
    // aplicacion -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // se carga la vista
    });
};
