import UserController from '../controllers/UserController.js'
import ActivityController from '../controllers/ActivityController.js'


export default class LevelMenuView {
    constructor() {
        this.userController = new UserController();
        this.activityController = new ActivityController();

        this.returnArrow = document.querySelector('#return-arrow');

        document.getElementById('coins').innerHTML = this.userController.getCoins();
        document.getElementById('points').innerHTML = this.userController.getPoints();

        this.bindReturn();
    }

    bindReturn() {
        this.returnArrow.addEventListener('click', event => {
            location.href = '/';
        })
    }
}
