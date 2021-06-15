import ActivityController from '../controllers/ActivityController.js'
import UserController from '../controllers/UserController.js'

export default class NewActivityView {
    constructor() {
        this.activityController = new ActivityController();
        this.userController = new UserController();

        // Gestão do formulário de adição de activitya
        this.userLoggedOutContent = document.getElementById('userLoggedOutContent');
        this.userLoggedInContent = document.getElementById('userLoggedInContent');
        this.newActivityForm = document.getElementById('frmNewActivity');
        this.newActivityMessage = document.getElementById('newActivityMessage');
        this.returnArrow = document.querySelector('#return-arrow');

        this.bindReturn();
        

        this.addAnswerButton = document.getElementById('answer-add-button');


        this.levelAnswers = document.getElementById('level-questions');

        this.questionsNum = 0;

        this.questions = [];

        this.createAnswers();

        this.bindNewAnswer();

        // Gere a visulização do conteúdo da página tendo em conta se o user está ou não autenticado 
        this.renderAddActivityForm();

    }

    bindReturn() {
        this.returnArrow.addEventListener('click', event => {
            location.href = '/';
        })
    }

    renderAddActivityForm() {
        if (this.userController.isLogged()) {
            this.userLoggedOutContent.style.visibility = 'hidden';
            this.userLoggedInContent.style.visibility = 'visible';
            this.bindNewActivityForm()
        } else {
            this.userLoggedOutContent.style.visibility = 'visible';
            this.userLoggedInContent.style.visibility = 'hidden';
        }
    }

    createAnswer() {
        this.questionsNum++;

        let htmlAnswer = `
        <label for="txtDescription" class="form-label">Question #${this.questionsNum}</label>
        <input placeholder="Title" class="form-control question-title" rows="3">
        <div id="answers-${this.questionsNum}">
        <input placeholder="Answer #1" class="form-control answer-${1}" rows="3">
        <input placeholder="Answer #2" class="form-control answer-${2}" rows="3">
        <input placeholder="Answer #3" class="form-control answer-${3}" rows="3">
        <input placeholder="Answer #4" class="form-control answer-${4}" rows="3">
        </div>
        <input type="number" placeholder="Correct Answer" class="form-control correct-answer" rows="3">
        `;

        this.addElement(this.levelAnswers, "div", `question-${this.questionsNum}`, htmlAnswer)
    }

    createAnswers() {

        this.createAnswer()
    }

    bindNewAnswer() {

        this.addAnswerButton.addEventListener('click', event => {

            event.preventDefault();

            this.createAnswer()
        })
    }

    addElement(parent, elementTag, elementId, html) {
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.classList.add('col');
        newElement.innerHTML = html;
        parent.appendChild(newElement);
    }



    removeElement(elementId) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }

    bindNewActivityForm() {
        this.newActivityForm.addEventListener('submit', event => {
            event.preventDefault();

            let questionsGroupDom = document.getElementById("level-questions")

            let i;
            for (i = 1; i <= questionsGroupDom.childElementCount; i++) {
                let question = {}

                let questionDom = document.getElementById(`question-${i}`)
                let answersDom = document.getElementById(`answers-${i}`).children

                if (answersDom[0].value) {
                    question[`answer1`] = answersDom[0].value

                    if (answersDom[1].value) {
                        question[`answer2`] = answersDom[1].value

                        if (answersDom[2].value) {
                            question[`answer3`] = answersDom[2].value

                            if (answersDom[3].value) {

                                question[`answer4`] = answersDom[3].value
                            }
                        }
                    }
                }

                question.description = questionDom.getElementsByClassName("question-title")[0].value;
                question.correctAnswer = Number(questionDom.getElementsByClassName("correct-answer")[0].value);

                if (!question.correctAnswer) {
                    alert(`Selecione uma pergunta correta na questão ${this.questionsNum}!`);
                    return false;
                }

                if (!question.correctAnswer) {
                    alert(`Introduza uma descrição na questão ${this.questionsNum}!`);
                    return false;
                }

                if (!answersDom[0].value || !answersDom[1].value) {
                    alert(`Preencha as respostas na questão ${this.questionsNum}!`);
                    return false;
                }


                this.questions.push(question);

            }

            let id = parseInt(document.getElementById("activity-id").value);
            let coins = parseInt(document.getElementById("coins-awarded").value);
            let points = parseInt(document.getElementById("points-awarded").value);
            let activityType = document.getElementById("activity-type").value;

            if (!id || !coins || !points || !activityType) {
                alert("Preencha todos os campos!");
                return false;
            }


            try {
                this.activityController.create(
                    id,
                    activityType,
                    coins,
                    points,
                    this.questions
                );
                this.displayMessage('Activity added with success!', 'success');

                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.href = "../index.html" }, 1000);
            } catch (err) {
                this.displayMessage(err, 'danger');
            }
        });
    }

    displayMessage(message, type) {
        this.newActivityMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
