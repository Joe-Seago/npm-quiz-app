var Model = require('./model');
var View = require('./view');
var Controller = require('./controller');

// When the page loads, creates new instances of the model, view, and controller, and initializes the first question
document.addEventListener('DOMContentLoaded', function() {
    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);

    // Calls the MODEL's questionNumber function for the first question/answers
    model.questionNumber();
});

