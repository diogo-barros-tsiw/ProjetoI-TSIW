import BadgeController from './../controllers/BadgeController.js'
import UserController from './../controllers/UserController.js'

export default class NewBadgeView {
    constructor() {
        this.badgeController = new BadgeController();
        this.userController = new UserController();

        // Gestão do formulário de adição de badge
        this.userLoggedOutContent = document.getElementById('userLoggedOutContent');
        this.userLoggedInContent = document.getElementById('userLoggedInContent');
        this.newBadgeForm = document.getElementById('frmNewBadge');
        this.newBadgeMessage = document.getElementById('newBadgeMessage');
        this.returnArrow = document.querySelector('#return-arrow');
        this.submitButton = document.querySelector('#form-submit');

        this.title = document.querySelector('#badge-title');
        this.requirement = document.querySelector('#badge-requirement');
        this.moreThan = document.querySelector('#badge-more-than');

        this.badgesList = document.querySelector('#badges-list');


        this.bindReturn();
        this.bindSubmit();

        this.fillBadgesList();
        this.bindErase();

        // Gere a visulização do conteúdo da página tendo em conta se o user está ou não autenticado 
        this.renderAddBadgeForm();

    }


    bindErase(){

        document.querySelectorAll('.erase-badge').forEach(function(button) {


            button.addEventListener('click', event => {

                let badgeController = new BadgeController();
                badgeController.remove(button.id);

                location.reload();
            })
            
        });
    }

    bindReturn() {
        this.returnArrow.addEventListener('click', event => {
            location.href = '/';
        })
    }

    addElement(parent, elementTag, elementId, html) {
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.classList.add('col');
        newElement.innerHTML = html;
        parent.appendChild(newElement);
    }

    renderAddBadgeForm() {
        if (this.userController.isLogged()) {
            this.userLoggedOutContent.style.visibility = 'hidden';
            this.userLoggedInContent.style.visibility = 'visible';
        } else {
            this.userLoggedOutContent.style.visibility = 'visible';
            this.userLoggedInContent.style.visibility = 'hidden';
        }
    }

    bindSubmit() {

        this.submitButton.addEventListener('click', event => {


            this.badgeController.create(this.title.value, this.requirement.value, this.moreThan.value, "")

            location.reload();
        })

    }

    fillBadgesList() {
        let badges = this.badgeController.getBadges();

        let html = ``;

        html += `<table class="table">
        <tr><th>Title</th><th>Requirement</th><th>More Than</th><th></th></tr>`

        for (let i = 0; i < badges.length; i++) {
            html += `<tr><th>${badges[i].title}</th><th>${badges[i].requirement}</th><th>${badges[i].moreThan}</th><th><div><button id="${i}" class="btn btn-warning erase-badge">Erase</button></div></th></tr>`
        }

        html += `</table>`;



        this.badgesList.innerHTML = html;


    }

    removeElement(elementId) {
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }


    displayMessage(message, type) {
        this.newBadgeMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
