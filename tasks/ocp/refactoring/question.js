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

function abstractQuestionRenderer() {}

abstractQuestionRenderer.prototype = {
    render: function (question) {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = 'question';

        var questionLabel = this.renderQuestionLabel(question);
        
        var answer = this.renderAnswer(question);

        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);

        return questionWrapper;
    },

    renderInput: function (question) {
    },

    renderQuestionLabel: function (question) {
        var questionLabel = document.createElement('div');
        questionLabel.className = 'question__label';
        var labelText = document.createTextNode(question.label);
        questionLabel.appendChild(labelText);
        return questionLabel;
    },

    renderAnswer: function (question) {
        var answer = document.createElement('div');
        answer.className = 'question__input';
        var input = this.renderInput(question);
        answer.appendChild(input);
        return answer;
    }
}

function choiceQuestionRenderer() {}

choiceQuestionRenderer.prototype = new abstractQuestionRenderer();

choiceQuestionRenderer.prototype.renderInput = function(question) {
    var input = document.createElement('select');
    var len = question.choices.length;
    for (var i = 0; i < len; i++) {
        var option = document.createElement('option');
        option.text = question.choices[i];
        option.value = question.choices[i];
        input.appendChild(option);
    }
    return input;
}

function inputQuestionRenderer() {}

inputQuestionRenderer.prototype = new abstractQuestionRenderer();

inputQuestionRenderer.prototype.renderInput = function (question) {
    var input = document.createElement('input');
    input.type = 'text';
    return input;
}


function QuestionView(renderers) {
    this.renderers = renderers;
}

QuestionView.prototype = {
    render: function (target, questions) {
        for (var i = 0; i < questions.length; i++) {
            target.appendChild(this.renderQuestion(questions[i]));
        }
    },

    renderQuestion: function (question) {
        return this.renderers[question.answerType].render(question);
    }
};

var questions = [
    new Question('НЛО?', AnswerType.Choice, ['Да', 'Неа']),
    new Question('Два+Два?', AnswerType.Input)
];

var questionRegion = document.getElementById('questions');
var renderers = {};
renderers[AnswerType.Choice] = new choiceQuestionRenderer();
renderers[AnswerType.Input] = new inputQuestionRenderer();

new QuestionView(renderers).render(questionRegion, questions);
