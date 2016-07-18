/*============ CONTROLLER ============*/

// Links the VIEW to the MODEL
var Controller = function(model, view) {
    // Upon storing values for current question in the MODEL, calls the setQuestion function in the VIEW to display values
    model.onChangeQuestionNumber = view.setQuestion.bind(view);
    // After user selects their answer, calls the MODEL's checkAnswer function to determine if it's correct and update the stored score variable
    view.onAnswerSubmit = model.checkAnswer.bind(model);
    // When the stored score variable is updated, calls the updateScore function in the VIEW to display the score change (if any)
    model.onScoreChange = view.updateScore.bind(view);
    // After the updated score is displayed, calls the MODEL's questionNumber function to store the values for the following question to start all over again
    view.onChangeQuestionNumber = model.questionNumber.bind(model);
    // After last question, calls the MODEL's showResults function to display the number of correct answers
    model.onGameEnd = view.showResults.bind(view);
};

module.exports = Controller;