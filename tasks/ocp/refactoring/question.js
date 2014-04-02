/**
 * @param {String}   label
 * @param {Number}   answerType
 * @param {String[]} [choices]
 * @constructor
 */
function Question(label, choices) {
    this.label = label;
    this.choices = choices;
}

function QuestionView() {}
QuestionView.prototype = {
    _innerClass: 'question',

    render: function (target, question) {
        var questionWrapper = document.createElement('div');
        questionWrapper.className = this._class();

        var questionLabel = document.createElement('div');
        questionLabel.className = this._class('label');

        var labelText = document.createTextNode(question.label);
        questionLabel.appendChild(labelText);

        var answer = document.createElement('div');
        answer.className = this._class('input');

        var input = this.buildInput(question);

        answer.appendChild(input);
        questionWrapper.appendChild(questionLabel);
        questionWrapper.appendChild(answer);
        target.appendChild(questionWrapper);
    },
    _class: function (className) {
        return this._innerClass + (className ? '__' + className : '');
    }
};

function QuestionViewInput() {};
QuestionViewInput.prototype = new QuestionView();
QuestionViewInput.prototype.buildInput = function (){
    var input = document.createElement('input');
    input.type = 'text';

    return input;
}


function QuestionViewChoice() {};
QuestionViewChoice.prototype = new QuestionView();
QuestionViewChoice.prototype.buildInput = function (question){
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

new QuestionViewChoice(new Question('НЛО?', ['Да', 'Неа']).render());
new QuestionViewInput(new Question('Два+Два?')).render();
