/*============= VIEW =============*/
var $ = require('jquery');

// VIEW Constructor
var View = function(model) {
    // Current instance of the MODEL passed from the MODEL
    this.model = model;

    // Linked variables
    this.questionElement = $('.question');
    this.answersElement = $('.answers');
    this.questionCurrentElement = $('.question-current');
    this.questionsTotalElement = $('.questions-total');
    this.scoreElement = $('.score');
    this.restartButtonElement = $('.restart-button');
    
    // Callback functions
    this.onChangeQuestionNumber = null;
    this.onAnswerSubmit = null;

    // Click event for submitting answers, calls onAnswerClick function (connects event listener to function)
    this.answersElement.click(this.onAnswerClick.bind(this));

    // Click function that creates new game (connects event listener to function)
    this.restartButtonElement.click(this.restartGame.bind(this));

    // Display only variables
    this.questionsPageElement = $('.questions-page');
    this.resultsPageElement = $('.results-page');
};

// Prototype function that displays stored values for current question 
View.prototype.setQuestion = function(model) {
    // Displays current question number
    this.questionCurrentElement.text(model.questionCurrent + 1);
    // Displays total number of questions
    this.questionsTotalElement.text(model.totalQuestions);
    // Displays current question text
    this.questionElement.text(model.questionText);
    // Empties answersElement
    this.answersElement.empty();
    
    // Iterates through answers array for current question
    for (var i = 0; i < model.answers.length; i++) {
        // sets answers to variable
        var answer = model.answers[i];
        // prints to answers element. ID set for use in onAnswerClick function
        this.answersElement.append('<li><button type="button" id="' + i + '">' + answer + '</button></li>');
    }
};

// Prototype function to store the submitted answer 
View.prototype.onAnswerClick = function(buttonId) {
    // takes the id from the answer the user clicked and stores in the choice variable
    var choice = parseInt(buttonId.target.id);

    // Passes the choice to the MODEL's checkAnswer function to determine if correct
    if (this.onAnswerSubmit) {
        this.onAnswerSubmit(choice);
    }
};
    
// Prototype function that updates score display element in the VIEW
View.prototype.updateScore = function(score) {
    // Displays current score from the MODEL's score variable
    this.scoreElement.text(score);
 
    // Callback function that initiates next question with MODEL's questionNumber function
    if (this.onChangeQuestionNumber) {
        this.onChangeQuestionNumber();
    }
};

// Display Only Functions
View.prototype.showResults = function(model) {
    this.questionsPageElement.hide();
    this.resultsPageElement.show();
    this.scoreElement.text(model.score);

};

// Function that creates a new game
View.prototype.restartGame = function() {
    // Displays the questions/answers section in the VIEW
    this.resultsPageElement.hide();
    this.questionsPageElement.show();

    // Resets values in MODEL
    this.model.reset();
    // Calling the MODEL's questionNumber function
    this.model.questionNumber();
};

module.exports = View;