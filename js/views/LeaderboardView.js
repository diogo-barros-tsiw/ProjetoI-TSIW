import UserController from '../controllers/UserController.js'
import ActivityController from '../controllers/ActivityController.js'


export default class LevelMenuView {
    constructor() {
        this.userController = new UserController();
        this.activityController = new ActivityController();

        this.returnArrow = document.querySelector('#return-arrow');

        this.bindReturn();

        document.getElementById('coins').innerHTML = this.userController.getCoins();
        document.getElementById('points').innerHTML = this.userController.getPoints();
    }

    bindReturn() {
        this.returnArrow.addEventListener('click', event => {
            location.href = '/';
        })
    }
}
