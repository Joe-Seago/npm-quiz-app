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
            text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
            answers: [
                '0815',
                '2B',
                'BAM128',
                'Barely'
            ],
            correct: 0

        }, {
            text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
            answers: [
                '0815',
                '2B',
                'BAM128',
                'Barely'
            ],
            correct: 1
        }, {
            text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
            answers: [
                '0815',
                '2B',
                'BAM128',
                'Barely'
            ],
            correct: 2
        }, {
            text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
            answers: [
                '0815',
                '2B',
                'BAM128',
                'Barely'
            ],
            correct: 3
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