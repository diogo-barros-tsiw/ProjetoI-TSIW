import UserController from '../controllers/UserController.js'
import ActivityController from '../controllers/ActivityController.js'


export default class LevelMenuView {
    constructor() {
        this.userController = new UserController();
        this.activityController = new ActivityController();

        this.levelContainer = document.querySelector('#level-container');
        this.returnArrow = document.querySelector('#return-arrow');

        this.bindLevels();

        // Atualiza botões tendo em conta se o user está autenticado ou não
        //this.updateStatusUI();

        this.bindPlay();
        this.bindReturn();

        document.getElementById('coins').innerHTML = this.userController.getCoins();
        document.getElementById('points').innerHTML = this.userController.getPoints();
    }

    hideLandingPage() {
        console.alert("beep bop")
    }

    bindLevels() {

        let html = ``;

        let i, j, level = 1;
        for (i = 0; i < 5; i++) {
            html = this.openRow(html);
            for (j = 0; j < 4; j++) {
                if (this.activityController.activityExists(level))
                    html = this.generateLevel(html, level);
                else
                    html = this.generateLockedLevel(html, level);
                level++;
            }
            html = this.closeRow(html);
        }

        this.levelContainer.innerHTML = html;
    }

    openRow(html) {
        html += `<div class="row level-menu-row">`
        return html
    }

    closeRow(html) {
        html += `</div>`
        return html
    }

    generateLevel(html, level) {

        /* empty star - ☆ */
        /* full star - ★ */

        let firstStar = "☆"
        let secondStar = "☆"
        let thirdStar = "☆"

        if (this.userController.getRatio(level) >= 0.33) {
            firstStar = "★"

            if (this.userController.getRatio(level) >= 0.66) {
                secondStar = "★"

                if (this.userController.getRatio(level) >= 1) {
                    thirdStar = "★"
                }
            }
        }

        html += `<div class="col">
                    <div class="level-menu-button row">
                        <button id="${level}" class="btn btn-danger">${level}
                        <div><span>${firstStar}${secondStar}${thirdStar}</span></div>
                        </button>
                    </div>
                </div>`;

        return html
    }

    generateLockedLevel(html, level) {

        /* empty star - ☆ */
        /* full star - ★ */

        html += `<div class="col">
                    <div class="level-menu-button row">
                        <button disabled id="${level}" class="btn btn-danger">${level}
                        <div><span>☆☆☆</span></div>
                        </button>
                    </div>
                </div>`;

        return html
    }

    bindPlay() {
        for (const levelMenuButton of document.getElementsByClassName("level-menu-button")) {
            
            if (!this.activityController.activityExists(levelMenuButton.children[0].id)) continue
            
            levelMenuButton.addEventListener('click', event => {
                


                this.activityController.setCurrentActivity(levelMenuButton.children[0].id)

                location.href = 'level.html';

            })
        }
    }

    bindReturn() {
        this.returnArrow.addEventListener('click', event => {
            location.href = '/';
        })
    }
}
