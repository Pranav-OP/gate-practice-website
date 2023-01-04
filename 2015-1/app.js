var quiz1 = {
    "JS": [
        {
            "id": 1,
            "question": "The expenditure on the project _____ as follows: equipment Rs.20 lakhs, salaries Rs.12  lakhs, and contingency Rs.3 lakhs. Inside which HTML element do we put the JavaScript?",
            "options": [
                {
                    "a": "break down",
                    "b": "break",
                    "c": "breaks down ",
                    "d": "breaks",
                }
            ],
            "answer": "breaks down",
            "score": 0,
            "status": ""
        },
        {
            "id": 2,
            "question": "The search engine’s business model ___________ around the fulcrum of trust.",
            "options": [
                {
                    "a": "revolves ",
                    "b": "plays",
                    "c": "sinks",
                    "d": "bursts",
                }
            ],
            "answer": "revolves ",
            "score": 0,
            "status": ""
        },
        {
            "id": 3,
            "question": "Two cars start at the same time from the same location and go in the same direction. The speed of the first car is 50 km/h and the speed of the second car is 60 km/h. The number of  hours it takes for the distance between the two cars to be 20 km is ___. ",
            "options": [
                {
                    "a": "1",
                    "b": "2",
                    "c": "3",
                    "d": "6",
                }
            ],
            "answer": "2 ",
            "score": 0,
            "status": ""
        },
        {
            "id": 4,
            "question": "Ten friends  planned to share equally the cost of buying a gift for their teacher.When two of  them decided not to contribute, each of the other friends had to pay Rs 150 more. The cost of the gift was Rs. ____. ",
            "options": [
                {
                    "a": "666",
                    "b": "3000 ",
                    "c": "6000 ",
                    "d": "12000 ",
                }
            ],
            "answer": "6000",
            "score": 0,
            "status": ""
        },
        {
            "id": 5,
            "question": "A court is to a judge as _____________ is to a teacher",
            "options": [
                {
                    "a": "a student ",
                    "b": " a punishment",
                    "c": "a syllabus ",
                    "d": "a school",
                }
            ],
            "answer": "a school",
            "score": 0,
            "status": ""
        }
    ]
}
var quizApp = function (quiz) {
    this.score = 0;
    this.qno = 1;
    this.currentque = 0;
    var totalque = quiz.JS.length;
    this.displayQuiz = function (cque) {
        this.currentque = cque;
        if (this.currentque < totalque) {
            $("#tque").html(totalque);
            $("#previous").attr("disabled", false);
            $("#next").attr("disabled", false);
            $("#qid").html(quiz.JS[this.currentque].id + '.');
            $("#question").html(quiz.JS[this.currentque].question);
            $("#question-options").html("");
            for (var key in quiz.JS[this.currentque].options[0]) {
                if (quiz.JS[this.currentque].options[0].hasOwnProperty(key)) {
                    $("#question-options").append(
                        "<div class='form-check option-block'>" +
                        "<label class='form-check-label'>" +
                        "<input type='radio' class='form-check-input' name='option' id='q" + key + "' value='" + quiz.JS[this.currentque].options[0][key] + "'><span id='optionval'>" +
                        quiz.JS[this.currentque].options[0][key] +
                        "</span></label>"
                    );
                }
            }
        }
        if (this.currentque <= 0) {
            $("#previous").attr("disabled", true);
        }
        if (this.currentque >= totalque) {
            $('#next').attr('disabled', true);
            for (var i = 0; i < totalque; i++) {
                this.score = this.score + quiz.JS[i].score;
            }
            return this.showResult(this.score);
        }
    }
    this.showResult = function (scr) {
        $("#result").addClass('result');
        $("#result").html("<h1 class='res-header'>Total Score: &nbsp;" + scr + '/' + totalque + "</h1>");
        for (var j = 0; j < totalque; j++) {
            var res;
            if (quiz.JS[j].score == 0) {
                res = '<span class="wrong">' + quiz.JS[j].score + '</span><i class="fa fa-remove c-wrong"></i>';
            } else {
                res = '<span class="correct">' + quiz.JS[j].score + '</span><i class="fa fa-check c-correct"></i>';
            }
            $("#result").append(
                '<div class="result-question"><span>Q ' + quiz.JS[j].id + '</span> &nbsp;' + quiz.JS[j].question + '</div>' +
                '<div><b>Correct answer:</b> &nbsp;' + quiz.JS[j].answer + '</div>' +
                '<div class="last-row"><b>Score:</b> &nbsp;' + res +
                '</div>'
            );
        }
    }
    this.checkAnswer = function (option) {
        var answer = quiz.JS[this.currentque].answer;
        option = option.replace(/</g, "&lt;") //for <
        option = option.replace(/>/g, "&gt;") //for >
        option = option.replace(/"/g, "&quot;")
        if (option == quiz.JS[this.currentque].answer) {
            if (quiz.JS[this.currentque].score == "") {
                quiz.JS[this.currentque].score = 1;
                quiz.JS[this.currentque].status = "correct";
            }
        } else {
            quiz.JS[this.currentque].status = "wrong";
        }
    }
    this.changeQuestion = function (cque) {
        this.currentque = this.currentque + cque;
        this.displayQuiz(this.currentque);
    }
}
function startQuiz(quiz) {
    var jsq = new quizApp(quiz);
    var selectedopt;
    $(document).ready(function () {
        jsq.displayQuiz(0);
        $('#question-options').on('change', 'input[type=radio][name=option]', function (e) {
            //var radio = $(this).find('input:radio');
            $(this).prop("checked", true);
            selectedopt = $(this).val();
        });
    });
    $('#next').click(function (e) {
        e.preventDefault();
        if (selectedopt) {
            jsq.checkAnswer(selectedopt);
        }
        jsq.changeQuestion(1);
    });
    $('#previous').click(function (e) {
        e.preventDefault();
        if (selectedopt) {
            jsq.checkAnswer(selectedopt);
        }
        jsq.changeQuestion(-1);
    });
}
startQuiz(quiz1);
