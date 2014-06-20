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

function QuestionView() {}
QuestionView.prototype = {
    render: function (target, questions) {
        for (var i = 0; i < questions.length; i++) {
            this.renderQuestion(target, questions[i]);
        }
    },

    renderQuestion: function (target, question) {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = 'question';

        var questionLabel = document.createElement('div');
        questionLabel.className = 'question__label';

        var labelText = document.createTextNode(question.label);
        questionLabel.appendChild(labelText);

        var answer = document.createElement('div');
        answer.className = 'question__input';

        var input;

        switch (question.answerType) {
            case AnswerType.Choice:
                input = document.createElement('select');
                var len = question.choices.length;
                for (var i = 0; i < len; i++) {
                    var option = document.createElement('option');
                    option.text = question.choices[i];
                    option.value = question.choices[i];
                    input.appendChild(option);
                }
                break;
            case AnswerType.Input:
                input = document.createElement('input');
                input.type = 'text';
                break;
        }

        answer.appendChild(input);
        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);
        target.appendChild(questionWrapper);
    }
};

var questions = [
    new Question('НЛО?', AnswerType.Choice, ['Да', 'Неа']),
    new Question('Два+Два?', AnswerType.Input)
];

var questionRegion = document.getElementById('questions');
new QuestionView().render(questionRegion, questions);
