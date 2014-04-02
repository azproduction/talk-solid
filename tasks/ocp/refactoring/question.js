var AnswerType = {
    Choice: 0,
    Input: 1
};

/**
 * @param {String}   label
 * @param {Number}   answerType
 * @param {String[]} [choices]
 * @constructor
 */
function Question(label, answerType, choices) {
    this.label = label;
    this.answerType = answerType;
    this.choices = choices;
}

function QuestionRendarer () {
    this.rendarers = [];

    this.addRendarer = function (choice, rendarer) {
        this.rendarers[choice] = rendarer;
    };

    this.render = function (target, question) {
        this.beforeRendar(target, question);
        this.rendarers[question.choices].call(this, target, question);
        this.afterRender(target);
    };

    this.beforeRendar = function (target, question) {
        this.questionWrapper = document.createElement('div');
        this.questionWrapper.className = 'question';

        this.questionLabel = document.createElement('div');
        this.questionLabel.className = 'question__label';

        this.labelText = document.createTextNode(question.label);
        this.questionLabel.appendChild(this.labelText);

        this.answer = document.createElement('div');
        this.answer.className = 'question__input';
    };

    this.afterRender = function (target) {
        this.answer.appendChild(this.input);
        this.questionWrapper.appendChild(this.questionLabel);
        this.questionWrapper.appendChild(this.answer);
        target.appendChild(this.questionWrapper);
    };
}


function QuestionView() {
    this.questionRendarer = QuestionRendarer();

    this.questionRendarer.addRendarer(AnswerType.Choice, function (target, question) {
        this.input = document.createElement('select');
        var len = question.choices.length;
        for (var i = 0; i < len; i++) {
            var option = document.createElement('option');
            option.text = question.choices[i];
            option.value = question.choices[i];
            this.input.appendChild(option);
        }
    });

    this.questionRendarer.addRendarer(AnswerType.Input, function (target, question) {
        this.input = document.createElement('input');
        this.input.type = 'text';
    });
}

QuestionView.prototype = {
    render: function (target, questions) {
        for (var i = 0; i < questions.length; i++) {
            this.questionRendarer.render(target, questions[i]);
        }
    }
};

var questions = [
    new Question('НЛО?', AnswerType.Choice, ['Да', 'Неа']),
    new Question('Два+Два?', AnswerType.Input)
];

var questionRegion = document.getElementById('questions');
new QuestionView().render(questionRegion, questions);
