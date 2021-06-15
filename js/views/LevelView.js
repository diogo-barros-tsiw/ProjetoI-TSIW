import UserController from '../controllers/UserController.js'
import ActivityController from '../controllers/ActivityController.js'
import BadgeController from '../controllers/BadgeController.js'


export default class LevelMenuView {
    constructor() {
        this.userController = new UserController();
        this.activityController = new ActivityController();
        this.badgeController = new BadgeController();

        this.returnArrow = document.querySelector('#return-arrow');
        this.continueButton = document.querySelector('#continue-button');
        this.quizLevelQuestions = document.querySelector('#quiz-level-questions');

        this.bindReturn();

        this.questionTitleDom = document.querySelector('#question-title');
        this.answer1Dom = document.querySelector('#a1');
        this.answer2Dom = document.querySelector('#a2');
        this.answer3Dom = document.querySelector('#a3');
        this.answer4Dom = document.querySelector('#a4');
        this.correctAnswersDom = document.querySelector('#correct-answers');
        this.totalAnswersDom = document.querySelector('#total-answers');

        this.firstStar = document.querySelector('#first-star');
        this.secondStar = document.querySelector('#second-star');
        this.thirdStar = document.querySelector('#third-star');

        this.modalResults = document.querySelector('#modal-results');

        this.modalResults.style.display = "none";

        this.bindAnswers();

        this.userAnswers = [];

        this.correctAnswers = [];

        document.getElementById('coins').innerHTML = this.userController.getCoins();
        document.getElementById('points').innerHTML = this.userController.getPoints();


        this.activity = this.activityController.getCurrentActivity();

        this.currentQuestion = 0;
        this.firstQuestion();
    }

  

    checkBadges(){
        let badges = this.badgeController.getBadges();
        let user = this.userController.getUser();
        let hasWonBadge = false;
        let badge = {}

        for (let i = 0; i < badges.length; i++)
        {
            if (this.userController.hasBadge(badges[i].title)) continue;
            
            if (badges[i].requirement == "coins")
            {
                if (user.coins > badges[i].moreThan){
                    hasWonBadge = true;
                    badge = badges[i]
                }
            }
            else if (badges[i].requirement == "points")
            {
                if (user.points > badges[i].moreThan){
                    hasWonBadge = true;
                    badge = badges[i]
                }
            }
            else if (badges[i].requirement == "activities")
            {
                if (user.activityAnswers.length > badges[i].moreThan){
                    hasWonBadge = true;
                    badge = badges[i]
                }
            }
        }

        if (hasWonBadge)
        {
            alert(`You won the '${badge.title}' Badge, congratulations!`)
            this.userController.assignBadge(badge);
        }
    }

    finalize() {
        this.modalResults.style.display = "block";

        this.correctAnswersDom.innerHTML = this.correctAnswers.length;
        this.totalAnswersDom.innerHTML = this.userAnswers.length;

        let ratio = this.correctAnswers.length / this.userAnswers.length;

        if (ratio >= 0.33) {
            this.firstStar.innerHTML = "★";

            if (ratio >= 0.66) {
                this.secondStar.innerHTML = "★";

                if (ratio >= 1) {
                    this.thirdStar.innerHTML = "★";

                }
            }
        }

        let activityAnswers = {};
        activityAnswers.activity = this.activity;
        activityAnswers.userAnswers = this.userAnswers;
        activityAnswers.correctAnswers = this.correctAnswers;
        activityAnswers.ratio = ratio;

        this.userController.saveActivity(activityAnswers);

        this.checkBadges();
    }

    firstQuestion() {
        this.questionTitleDom.innerHTML = this.activity.questions[0].description;

        if (this.activity.questions[0].answer1) {
            this.answer1Dom.innerHTML = this.activity.questions[0].answer1;
        }
        else {
            this.answer1Dom.style.display = 'none';
        }

        if (this.activity.questions[0].answer2) {
            this.answer2Dom.innerHTML = this.activity.questions[0].answer2;
        }
        else {

            this.answer2Dom.style.display = 'none';
        }

        if (this.activity.questions[0].answer3) {
            this.answer3Dom.innerHTML = this.activity.questions[0].answer3;
        }
        else {

            this.answer3Dom.style.display = 'none';
        }

        if (this.activity.questions[0].answer4) {
            this.answer4Dom.innerHTML = this.activity.questions[0].answer4;
        }
        else {

            this.answer4Dom.style.display = 'none';
        }
    }

    nextQuestion(question) {
        this.currentQuestion++;

        this.questionTitleDom.innerHTML = this.activity.questions[this.currentQuestion].description;

        if (this.activity.questions[this.currentQuestion].answer1) {
            this.answer1Dom.innerHTML = this.activity.questions[this.currentQuestion].answer1;
        }
        else {
            this.answer1Dom.style.display = 'none';
        }

        if (this.activity.questions[this.currentQuestion].answer2) {
            this.answer2Dom.innerHTML = this.activity.questions[this.currentQuestion].answer2;
        }
        else {

            this.answer2Dom.style.display = 'none';
        }

        if (this.activity.questions[this.currentQuestion].answer3) {
            this.answer3Dom.innerHTML = this.activity.questions[this.currentQuestion].answer3;
        }
        else {

            this.answer3Dom.style.display = 'none';
        }

        if (this.activity.questions[this.currentQuestion].answer4) {
            this.answer4Dom.innerHTML = this.activity.questions[this.currentQuestion].answer4;
        }
        else {

            this.answer4Dom.style.display = 'none';
        }



    }

    generateAnswer() {

    }

    answer(answerNum) {
        this.userAnswers.push(answerNum);

        if (answerNum == this.activity.questions[this.currentQuestion].correctAnswer) {
            this.correctAnswers.push(answerNum)
        }

        if (this.currentQuestion >= this.activity.questions.length - 1) {
            this.finalize();
        }
        else
            this.nextQuestion();
    }

    bindAnswers() {
        this.answer1Dom.addEventListener('click', event => {
            this.answer(1);
        })

        this.answer2Dom.addEventListener('click', event => {
            this.answer(2);
        })

        this.answer3Dom.addEventListener('click', event => {
            this.answer(3);
        })

        this.answer4Dom.addEventListener('click', event => {
            this.answer(4);
        })
    }

    bindReturn() {
        this.continueButton.addEventListener('click', event => {
            location.href = '/html/levelMenu.html';
        })

        this.returnArrow.addEventListener('click', event => {
            location.href = '/html/levelMenu.html';
        })
    }
}
