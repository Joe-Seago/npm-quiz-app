/*============= VIEW =============*/
var $ = require('jquery');

// VIEW Constructor
class View {

    constructor(model) {
        // Current instance of the MODEL passed from the MODEL
        this.model = model;

        // Linked variables
        this.questionElement = $('.question');
        this.answersElement = $('.answers');
        this.questionCurrentElement = $('.question-current');
        this.questionsTotalElement = $('.questions-total');
        this.scoreElement = $('.score');
        this.restartButtonElement = $('.restart-button');
        this.submitAnswer = $('.submit-answer');
        
        // Callback functions
        this.onChangeQuestionNumber = null;
        this.onAnswerSubmit = null;

        // Click event for submitting answers, calls onAnswerClick function (connects event listener to function)
        this.submitAnswer.click(this.onAnswerClick.bind(this));

        // Click function that creates new game (connects event listener to function)
        this.restartButtonElement.click(this.restartGame.bind(this));

        // Display only variables
        this.questionsPageElement = $('.questions-page');
        this.resultsPageElement = $('.results-page');
    }

    // Prototype function that displays stored values for current question 
    setQuestion(model) {
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
            this.answersElement.append(`<li><input type="radio" id="checkbox${i}" class="css-checkbox" name="answers" value="${i}"><label for="checkbox${i}" class="css-label">${answer}</label></li>`);
        }
    }

    // Prototype function to store the submitted answer 
    onAnswerClick(buttonId) {
        // takes the id from the answer the user clicked and stores in the choice variable
        var choice = parseInt(this.answersElement.find('input[name=answers]:checked').val())
        console.log(choice);
        // Passes the choice to the MODEL's checkAnswer function to determine if correct
        if (this.onAnswerSubmit) {
            this.onAnswerSubmit(choice);
        }
    }
    
    // Prototype function that updates score display element in the VIEW
    updateScore(score) {
        // Displays current score from the MODEL's score variable
        this.scoreElement.text(score);
     
        // Callback function that initiates next question with MODEL's questionNumber function
        if (this.onChangeQuestionNumber) {
            this.onChangeQuestionNumber();
        }
    }

    // Display Only Functions
    showResults(model) {
        this.questionsPageElement.hide();
        this.resultsPageElement.show();
        this.scoreElement.text(model.score);
    }

    // Function that creates a new game
    restartGame() {
        // Displays the questions/answers section in the VIEW
        this.resultsPageElement.hide();
        this.questionsPageElement.show();

        // Resets values in MODEL
        this.model.reset();
        // Calling the MODEL's questionNumber function
        this.model.questionNumber();
    }
}

module.exports = View;