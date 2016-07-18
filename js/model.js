/*============ MODEL ============*/
class Model {
// MODEL Constructor
    constructor() {
        // Linked Variables with View
        this.questionText = "";
        this.answers = [];
        this.questionCurrent = 0;
        this.score = 0;

        // Array of question objects
        this.questions = 
        [{
            text: 'Which princess sings the line: "There must be more than this provincial life"?',
            answers: [
                'Jasmine',
                'Belle',
                'Cinderella',
                'Snow White'
            ],
            correct: 1

        }, {
            text: 'Which princess sings "Look at me, I will never pass for a perfect bride, Or a perfect daughter?"',
            answers: [
                'Jasmine',
                'Belle',
                'Mulan',
                'Tiana'
            ],
            correct: 2
        }, {
            text: 'Where do Ariel and Eric get married?',
            answers: [
                'On a boat',
                'On the beach',
                'In a church',
                'At Eric\'s castle'
            ],
            correct: 0
        }, {
            text: 'How many Disney princesses have evil stepmothers?',
            answers: [
                '1',
                '2',
                '3',
                '4'
            ],
            correct: 1
        }];
        
        // Length of questions array as total number of questions
        this.totalQuestions = this.questions.length;

        // Callback functions 
        this.onChangeQuestionNumber = null;
        this.onAnswerSubmit = null;
        this.onGameEnd = null;
    }
    
// Prototype function to reset values upon restarting the game
    reset() {
        this.questionCurrent = 0;
        this.score = 0;
    }

// Prototype function that stores the current question object's values in the MODEL's variables
    questionNumber() {
        // Storing actual question text 
        this.questionText = this.questions[this.questionCurrent].text;
        // Storing the answer values in the answer array
        this.answers = this.questions[this.questionCurrent].answers;

        // Links to setQuestion function in VIEW to update displayed questions/answers
        if (this.onChangeQuestionNumber) {
            this.onChangeQuestionNumber(this);
        }
    }

// Prototype function that checks if submitted answer is correct and updates MODEL's score variable
    checkAnswer(choice) {
        // Sets current question object to variable question
        var question = this.questions[this.questionCurrent];

        // Adds 1 to MODEL's score var if submitted answer is correct
        if (question.correct === choice) {
            this.score +=1; 
        }
        // Increments questionCurrent if it's not the last question 
        if (this.questionCurrent + 1 < this.questions.length) {
            this.questionCurrent +=1;
        // Last question calls function to show results
        } else {
            if (this.onGameEnd) {
                this.onGameEnd(this);
            }
        }
        // Updates displayed score in the VIEW
        if (this.onScoreChange) {
            this.onScoreChange(this.score);
        }
        
    }
}

module.exports = Model;